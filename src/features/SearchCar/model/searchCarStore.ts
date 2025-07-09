import { rimsStore } from '@entities/Rims/model/rimsStore'
import { filterTrueKeys, handleCatchedError, localStorageManager } from '@shared/libs'
import { makeAutoObservable } from 'mobx'
import { adaptData } from './adaptBrandCountryData'
import {
  BrandCountries,
  BrandStructure,
  CarData,
  CarDataWithParams,
  CountryEntry,
  Generation,
  ISpecifiedCarsLoadingProps,
} from './types'
import { convertActiveParamsToFilterRimParams } from '@/entities/Rims/lib/convertActiveParamsToFilterRimParams'
import { fetchBrandCountries } from '@/features/SearchCar/api/fetchBrandCountries'
import { fetchBrandModels } from '@/features/SearchCar/api/fetchBrandModels'
import { fetchModelGenerations } from '@/features/SearchCar/api/fetchModelGenerations'
import { fetchSpecifiedCar } from '@/features/SearchCar/api/fetchSpecifiedCar'
import { fetchSpecifiedCarFiltered, fetchSpecifiedCarFilteredGrouped } from '@/features/SearchCar/api/fetchSpecifiedCarFiltered'

class SearchCarStore {
  brandCountries: CountryEntry[] | null = null
  brandModels: BrandStructure | null = null
  generations: Generation[] | null = null
  error: string | null = null
  isLoading = false
  activeBrand: string | undefined
  activeModel: string | undefined
  activeGeneration: Generation | undefined
  currentCar: CarData | null = null
  currentStep = 1

  constructor() {
    makeAutoObservable(this)

    const carDataFromLS = localStorageManager.getItem<CarData>('carData')

    if (carDataFromLS) {
      this.currentCar = carDataFromLS
    }
  }

  private async fetchData<T>(fetchFn: () => Promise<T>, setData: (data: T | null) => void) {
    this.setLoading(true)
    this.setError(null)
    setData(null)
    try {
      const data = await fetchFn()
      setData(data)
    } catch (error) {
      this.handleError(error)
    } finally {
      this.setLoading(false)
    }
  }

  loadBrandCountries() {
    this.fetchData<BrandCountries | undefined>(fetchBrandCountries, (data) => (this.brandCountries = adaptData(data!)))
  }

  loadBrandModels(brandName: string) {
    this.fetchData<BrandStructure>(
      () => fetchBrandModels(brandName),
      (data) => (this.brandModels = data),
    )
  }

  loadModelGenerations(brand = '', model = '') {
    this.fetchData<Generation[]>(
      () => fetchModelGenerations(brand, model),
      (data) => (this.generations = data),
    )
  }

  loadSpecifiedCar = async (generation: Generation) => {
    if (!generation) return

    await rimsStore.resetFiltersAndReload()

    const carData: CarData = await fetchSpecifiedCar({
      // Brand: brand,
      // Model: model,
      // BeginVIP: beginVIP,
      // EndVIP: endVIP,
      // BodyType: bodyType,
      // BodyDefenitionId: bodyDefenitionId,
      // DoorsAmount: doorsAmount
      CarId: generation.carId,
    })

    this.setCurrentCar(carData)

    await rimsStore.loadSpecifiedCarRimParams({ CarId: carData.id })
  }

  loadSpecifiedCarOnly = async (generation: Generation) => {
    await rimsStore.loadData()

    const carData: CarData = await fetchSpecifiedCar({
      CarId: generation.carId,
    })
    this.activeGeneration = generation
    this.currentCar = carData
  }

  loadSpecifiedCarByCarId = async (carId: number) => {
    const carData: CarData = await fetchSpecifiedCar({
      // Brand: brand,
      // Model: model,
      // BeginVIP: beginVIP,
      // EndVIP: endVIP,
      // BodyType: bodyType,
      // BodyDefenitionId: bodyDefenitionId,
      // DoorsAmount: doorsAmount
      CarId: carId,
    })

    this.setCurrentCar(carData)

    await rimsStore.loadSpecifiedCarRimParams({ CarId: carData.id })
  }

  loadSpecifiedCarFiltered = async ({ offset, limit, append = false }: ISpecifiedCarsLoadingProps) => {
    if (this.currentCar && rimsStore.currentCategory) {
      const { id } = this.currentCar
      const ApplicabilityParam = rimsStore.currentCategory

      const filterRimParams = convertActiveParamsToFilterRimParams(rimsStore.activeParams)

      const { chunkNumber, rimAssortmentChunk, rimsAmount } = await fetchSpecifiedCarFiltered({
        offset,
        limit,
        CarId: id,
        ApplicabilityParam,
        filterRimParams,
        sortDirection: rimsStore.sortDirection,
      })

      rimsStore.setRims(rimAssortmentChunk, append)
      rimsStore.offset = chunkNumber
      rimsStore.total = rimsAmount
    }
  }

  loadSpecifiedCarFilteredGrouped = async ({ offset, limit, append = false }: ISpecifiedCarsLoadingProps) => {
    if (this.currentCar && rimsStore.currentCategory) {
      const { id } = this.currentCar
      const ApplicabilityParam = rimsStore.currentCategory

      const filterRimParams = convertActiveParamsToFilterRimParams(rimsStore.activeParams)

      const { chunkNumber, rimItemsGroups, rimsAmount } = await fetchSpecifiedCarFilteredGrouped({
        offset,
        limit,
        CarId: id,
        ApplicabilityParam,
        filterRimParams,
        sortDirection: rimsStore.sortDirection,
      })

      rimsStore.setGroupedRims(rimItemsGroups, append)
      rimsStore.offset = chunkNumber
      rimsStore.total = rimsAmount
    }
  }

  setCurrentStep = (step: number) => {
    this.currentStep = step
  }

  setBrand = (brand: string) => {
    this.activeBrand = brand
  }

  resetBrand = () => {
    this.activeBrand = undefined
  }

  setModel = (model: string) => {
    this.activeModel = model
  }

  resetModel = () => {
    this.activeModel = undefined
  }

  resetGeneration = () => {
    this.activeGeneration = undefined
  }

  setCurrentCar = (carData: CarData) => {
    this.currentCar = carData
    this.resetBrand()
    this.resetModel()
    this.resetGeneration()
    // rimsStore.getRims({})
    rimsStore.getGroupedRims({})
    localStorageManager.setItem('carData', { ...carData, params: filterTrueKeys(rimsStore.parameterCategories) })
  }

  resetCurrentCar = async () => {
    this.currentCar = null
    this.currentStep = 1
    localStorageManager.removeItem('carData')
    rimsStore.resetFiltersAndReload()
    // await rimsStore.getRims({})
  }

  resetCarWithoutReload = async () => {
    this.currentCar = null
    this.currentStep = 1
    localStorageManager.removeItem('carData')
    rimsStore.resetFilters()
  }

  getTitle = (): string => {
    const carDataFromLS = localStorageManager.getItem<CarDataWithParams>('carData')

    if (!carDataFromLS) {
      if (this.activeModel) {
        return `Диски ${this.activeBrand} ${this.activeModel}`
      }
      if (this.activeBrand) {
        return `Диски ${this.activeBrand}`
      }
      return 'Диски'
    }

    const { firm, model, beginVIP, endVIP } = carDataFromLS

    return `Диски для ${firm} ${model} ${beginVIP} - ${endVIP}`
  }

  private setLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }

  private setError(error: string | null) {
    this.error = error
  }

  private handleError(e: unknown) {
    const error = handleCatchedError(e)
    this.setError(error)
  }

  get isCarSelected(): boolean {
    return Boolean(this.currentCar)
  }
}

const searchCarStore = new SearchCarStore()
export default searchCarStore
