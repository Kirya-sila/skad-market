import { fetchAvailableParams } from '@entities/Rims/api/fetchAvailableParams'
import { fetchRimAssortmentPageGrouped, fetchRimAssortmentPage } from '@entities/Rims/api/fetchRimAssortmentPage'
import { convertActiveParamsToFilterRimParams } from '@entities/Rims/lib/convertActiveParamsToFilterRimParams'
import { getAllActiveFilters } from '@entities/Rims/lib/getAllActiveFilters'
import { revalidateActiveParams } from '@entities/Rims/lib/revalidateActiveParams'
import { transformActiveParamsToFilterRimParams } from '@entities/Rims/lib/transformActiveParamsToFilterRimParams'
import { INITIAL_ACTIVE_PARAMS, RIMS_FILTER_LIST, SORT_LOCALIZED } from '@entities/Rims/model/const'
import { convertActiveParamsToDTO } from '@entities/Rims/ui/FilterBar/utils'
import { filterTrueKeys, handleCatchedError, localStorageManager } from '@shared/libs'
import { makeAutoObservable } from 'mobx'
import {
  fetchRimAssortmentFiltered,
  fetchRimAssortmentFilteredGrouped,
  fetchSpecifiedCarRimParams,
  getRimPassport,
} from '../api'
import { fetchOneRim } from './../api/fetchOneRim'
import { fetchRimCompatibleCars } from './../api/fetchRimCompatibleCars'
import { sortingConfig } from './config'
import {
  ActiveFilter,
  ActiveFilterName,
  ActiveParams,
  AvailableInputParams,
  AvailableParams,
  FilterName,
  FilterRimParams,
  IRimItemsGroup,
  ParameterGroups,
  RimCompatibleCarType,
  RimDTO,
  RimFilter,
  SpecifiedCarRimParamsRequest,
} from './types'
import { Params } from '@/constants'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { CarData, CarDataWithParams } from '@/features/SearchCar/model/types'
import { toast } from '@/helpers'
import { Colors } from '@/shared/types'

export const LOAD_AMOUNT = 16

export interface AvailableFilterValue {
  value: number | string
  isActive: boolean
  isAvailable: boolean
}

export interface AvailableFilter<K extends keyof RimFilter> {
  name: ActiveFilterName
  values: AvailableFilterValue[]
}

export type AvailableFilters = AvailableFilter<keyof RimFilter>[]

class RimsStore {
  rims: RimDTO[] = []
  groupedRims: IRimItemsGroup[] = []
  availableParams: AvailableParams | undefined
  activeParams: ActiveParams = INITIAL_ACTIVE_PARAMS
  total = 0
  offset = 1
  parameterCategories: ParameterGroups | null = { All: true, O: true, OT: true, T: true, TT: true }
  currentCategory: Params | null = Params.All
  amount: number = LOAD_AMOUNT
  sortBy = 'Price'
  sortDirection: 'Asc' | 'Desc' = 'Asc'
  currentRimAllVersions: RimDTO[] = []
  currentRimWheelCode: string | number = ''
  currentRim: RimDTO | undefined
  currentRimAllColors: { colorName: string; color: Colors; wheelCode: string }[] = []
  compatibleCars: RimCompatibleCarType[] = []
  selectedColor: Colors | null = null
  error: string | null = null
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  public async fetchData(wheelCode: string | number) {
    this.setLoading(true)
    this.setError(null)
    const currentCar = searchCarStore.currentCar
    try {
      const newData = await fetchOneRim(wheelCode, currentCar?.id)
      this.currentRimAllVersions = newData
      this.setCurrentRimByWheelCode()

      const allColorsArr = newData.map((item) => ({
        colorName: item.colorName,
        color: item.colorNameUnique,
        wheelCode: item.wheelCode,
      }))

      this.currentRimAllColors = allColorsArr
    } catch (error) {
      this.handleError(error)
    } finally {
      this.setLoading(false)
    }
  }

  public async fetchCompatibleCars(wheelCode: string | number) {
    this.setError(null)
    try {
      const newData = await fetchRimCompatibleCars(wheelCode)
      this.compatibleCars = newData
    } catch (error) {
      this.handleError(error)
    }
  }

  public setLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }

  public setError(error: string | null) {
    this.error = error
  }

  public handleError(e: unknown) {
    const error = handleCatchedError(e)
    this.setError(error)
  }

  loadOneRim = (wheelCode: string | number) => {
    this.currentRimWheelCode = wheelCode
    this.fetchData(wheelCode)
  }

  setCurrentRimByWheelCode = () => {
    this.currentRim = this.currentRimAllVersions.find((rim) => rim.wheelCode === this.currentRimWheelCode)
  }

  setCurrentRimByColor = (colorName: string) => {
    this.currentRim = this.currentRimAllVersions.find((rim) => rim.colorName === colorName)
  }

  loadCompatibleCars = (wheelCode: string | number) => {
    this.fetchCompatibleCars(wheelCode)
  }

  setSelectedColor = (colorName: string) => {
    this.setCurrentRimByColor(colorName)
    // this.selectedColor = color
  }

  updateAvailableParams = (availableParams: AvailableParams) => {
    // TODO можно будет убрать, когда бэк будет присылать цвета, цены итд
    this.activeParams = { ...this.activeParams, ...revalidateActiveParams(availableParams, this.activeParams) }

    this.availableParams = availableParams
    this.setParameterCategories(availableParams.parameterGroups as unknown as ParameterGroups)
  }

  setCurrentCategory = async (category: Params) => {
    if (category && category !== this.currentCategory) {
      this.setLoading(true)
      this.currentCategory = category
      // await searchCarStore.loadSpecifiedCarFiltered({ offset: 1, limit: LOAD_AMOUNT })
      await searchCarStore.loadSpecifiedCarFilteredGrouped({ offset: 1, limit: LOAD_AMOUNT })
      await this.reloadSpecifiedCarRimParams()
      this.setLoading(false)
    }
  }

  setParameterCategories = (parameterCategories: ParameterGroups | null) => {
    if (parameterCategories) {
      this.parameterCategories = parameterCategories

      const params = filterTrueKeys(parameterCategories)

      if (params?.length < 1) return

      if (params.includes(Params.All)) {
        this.currentCategory = Params.All
      } else {
        this.currentCategory = params[0]
      }
    }
  }

  loadAvailableParams = async (params?: Partial<AvailableInputParams>) => {
    const carDataFromLS = localStorageManager.getItem<CarDataWithParams>('carData')

    if (carDataFromLS || searchCarStore.activeBrand || searchCarStore.activeModel) {
      if (carDataFromLS) {
        await this.loadSpecifiedCarRimParams({ CarId: carDataFromLS.id })
      } else {
        await this.loadSpecifiedCarRimParams({
          brand: searchCarStore.activeBrand,
          model: searchCarStore.activeModel,
        })
      }

      return
    }

    const availableParams = await fetchAvailableParams({
      isInputParamsIncluded: Boolean(params),
      inputParams: params,
      modelParams: { brand: searchCarStore.activeBrand, model: searchCarStore.activeModel },
    })

    this.updateAvailableParams(availableParams)
  }

  loadAssortmentFiltered = async (filterParams?: Partial<FilterRimParams>) => {
    const filterRimParams = filterParams ?? convertActiveParamsToFilterRimParams(this.activeParams)

    this.offset = 0
    const { chunkNumber, rimAssortmentChunk, rimsAmount } = await fetchRimAssortmentFiltered({
      offset: 1,
      limit: LOAD_AMOUNT,
      filterRimParams,
      sortDirection: this.sortDirection,
    })

    this.total = rimsAmount
    this.offset = chunkNumber

    this.setRims(rimAssortmentChunk)
  }

  loadAssortmentFilteredGrouped = async (filterParams?: Partial<FilterRimParams>) => {
    const filterRimParams = filterParams ?? convertActiveParamsToFilterRimParams(this.activeParams)

    this.offset = 0
    const { chunkNumber, rimItemsGroups, rimsAmount } = await fetchRimAssortmentFilteredGrouped({
      offset: 1,
      limit: LOAD_AMOUNT,
      filterRimParams,
      sortDirection: this.sortDirection,
    })

    this.total = rimsAmount
    this.offset = chunkNumber

    this.setGroupedRims(rimItemsGroups)
  }

  loadSpecifiedCarRimParams = async ({
    CarId,
    brand,
    model,
  }: Omit<SpecifiedCarRimParamsRequest, 'ApplicabilityParam' | 'InputRimParams'>) => {
    if (!this.currentCategory) return

    const InputRimParams = transformActiveParamsToFilterRimParams(this.activeParams)
    const rimParams = await fetchSpecifiedCarRimParams({
      CarId,
      brand,
      model,
      ApplicabilityParam: this.currentCategory,
      InputRimParams,
    })

    if (rimParams) {
      this.updateAvailableParams(rimParams)
    }
  }

  reloadSpecifiedCarRimParams = async () => {
    const carDataFromLS = localStorageManager.getItem<CarData>('carData')

    if (!carDataFromLS || !this.currentCategory) return

    const InputRimParams = transformActiveParamsToFilterRimParams(this.activeParams)
    const rimParams = await fetchSpecifiedCarRimParams({
      CarId: carDataFromLS?.id,
      ApplicabilityParam: this.currentCategory,
      InputRimParams,
    })

    if (rimParams) {
      this.updateAvailableParams(rimParams)
    }
  }

  reloadAvailableParams = async () => {
    await this.loadAvailableParams(convertActiveParamsToDTO(this.activeParams))
  }

  setRims = (rims: RimDTO[], append = false) => {
    if (append && this.rims && rims) {
      this.rims = [...this.rims, ...rims]
    } else {
      this.rims = rims
    }
  }

  setGroupedRims = (rims: IRimItemsGroup[] = [], append = false) => {
    if (append && this.rims && rims) {
      this.groupedRims = [...this.groupedRims, ...rims]
    } else {
      this.groupedRims = rims
    }
  }

  // setGroupedRims = ()

  getRims = async ({
    offset = 1,
    limit = LOAD_AMOUNT,
    append = false,
  }: {
    offset?: number
    limit?: number
    append?: boolean
  }) => {
    this.setLoading(true)
    try {
      if (searchCarStore.isCarSelected) {
        await searchCarStore.loadSpecifiedCarFiltered({ offset, limit, append })
        // await searchCarStore.loadSpecifiedCarFilteredGrouped({ offset, limit, append })
      } else {
        let chunkNumber
        let rimsAmount
        let rimAssortmentChunk
        if (!this.isInitial) {
          const filterRimParams = convertActiveParamsToFilterRimParams(this.activeParams)
          const data = await fetchRimAssortmentFiltered({
            offset,
            limit,
            filterRimParams,
            sortDirection: this.sortDirection,
          })
          chunkNumber = data.chunkNumber
          rimsAmount = data.rimsAmount
          rimAssortmentChunk = data.rimAssortmentChunk
        } else {
          const data = await fetchRimAssortmentPage({
            offset,
            limit,
            sortDirection: this.sortDirection,
          })
          chunkNumber = data.chunkNumber
          rimsAmount = data.rimsAmount
          rimAssortmentChunk = data.rimAssortmentChunk
        }

        this.total = rimsAmount
        this.offset = chunkNumber
        this.setRims(rimAssortmentChunk, append)
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message)
      }
    } finally {
      this.setLoading(false)
    }
  }

  getGroupedRims = async ({
    offset = 1,
    limit = LOAD_AMOUNT,
    append = false,
  }: {
    offset?: number
    limit?: number
    append?: boolean
  }) => {
    this.setLoading(true)
    try {
      if (searchCarStore.isCarSelected) {
        await searchCarStore.loadSpecifiedCarFilteredGrouped({ offset, limit, append })
      } else {
        let chunkNumber
        let rimsAmount
        let rimItemsGroups
        if (!this.isInitial) {
          const filterRimParams = convertActiveParamsToFilterRimParams(this.activeParams)
          const data = await fetchRimAssortmentFilteredGrouped({
            offset,
            limit,
            filterRimParams,
            sortDirection: this.sortDirection,
          })
          chunkNumber = data.chunkNumber
          rimsAmount = data.rimsAmount
          rimItemsGroups = data.rimItemsGroups
        } else {
          const data = await fetchRimAssortmentPageGrouped({
            offset,
            limit,
            sortDirection: this.sortDirection,
          })
          chunkNumber = data.chunkNumber
          rimsAmount = data.rimsAmount
          rimItemsGroups = data.rimItemsGroups
        }

        this.total = rimsAmount
        this.offset = chunkNumber
        this.setGroupedRims(rimItemsGroups, append)
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message)
      }
    } finally {
      this.setLoading(false)
    }
  }

  get isInitial() {
    return Object.is(JSON.stringify(this.activeParams), JSON.stringify(INITIAL_ACTIVE_PARAMS))
  }

  get filteredRims(): RimDTO[] {
    // TODO fix
    return this.rims
  }

  get filteredGroupRims(): IRimItemsGroup[] {
    // TODO fix
    return this.groupedRims
  }

  get activeFilters(): ActiveFilter[] {
    return getAllActiveFilters(this.activeParams, ['price'])
  }

  get availableFilters() {
    // TODO fix

    return [{ name: 'diameter', values: [{ value: 12, isActive: true, isAvailable: false }] }]
  }

  get filters(): AvailableFilter<keyof RimFilter>[] {
    const filters = RIMS_FILTER_LIST.map((filterName) => {
      const name = filterName as ActiveFilterName

      const availableValues = this.availableParams?.[name as FilterName]

      if (availableValues) {
        const entries = Object.entries(availableValues)
        const sortedEntries = entries.sort((a, b) => {
          let result = (b[1] ? 1000 : 0) - (a[1] ? 1000 : 0)

          const customSort = sortingConfig[name]?.direction

          const numA = Number(a[0])
          const numB = Number(b[0])
          if (customSort === 'asc') {
            result += (numA - numB) % 1000
          } else if (customSort === 'desc') {
            result += (numB - numA) % 1000
          }

          return result
        })

        const values = sortedEntries.map(([value, isAvailable]) => ({
          value,
          isAvailable,
          isActive: Boolean(this.activeParams?.[name as ActiveFilterName]?.[value]),
        }))

        return {
          name,
          values,
        }
      }

      // <> TODO убрать когда будет приходить с бэка
      if (name === 'price') {
        return {
          name,
          values: [this.activeParams.price.min, this.activeParams.price.max].map((value) => ({
            value,
            isAvailable: true,
            isActive: false,
          })),
        }
      }

      if (name === 'setFrom') {
        return {
          name,
          values: [
            {
              value: 4,
              isActive: this.activeParams?.[name as ActiveFilterName]?.[4],
              isAvailable: true,
            },
          ],
        }
      }

      if (name === 'color') {
        return {
          name,
          values: Object.values(Colors).map((value) => ({
            value,
            isAvailable: true,
            isActive: this.activeParams?.[name][value],
          })),
        }
      }

      return {
        name,
        values: [
          {
            value: '-',
            isActive: this.activeParams?.[name as ActiveFilterName]?.['-'],
            isAvailable: true,
          },
        ],
      }
    })

    return filters as AvailableFilter<keyof RimFilter>[]
  }

  loadData = async () => {
    if (searchCarStore.isCarSelected) {
      // await searchCarStore.loadSpecifiedCarFiltered({ offset: 1, limit: LOAD_AMOUNT })
      await searchCarStore.loadSpecifiedCarFilteredGrouped({ offset: 1, limit: LOAD_AMOUNT })
    } else {
      // await this.loadAssortmentFiltered()
      await this.loadAssortmentFilteredGrouped()
    }
    await this.reloadAvailableParams()
  }

  resetFilters = async (reload = true) => {
    this.activeParams = INITIAL_ACTIVE_PARAMS
    searchCarStore.resetBrand()
    searchCarStore.resetModel()
    searchCarStore.setCurrentStep(1)
  }

  resetFiltersAndReload = async () => {
    this.resetFilters()
    await this.loadData()
  }

  toggleFilter = async (filterName: ActiveFilterName, value: number | string) => {
    this.activeParams[filterName][value] = !this.activeParams[filterName][value]
    await this.loadData()
  }

  getRimsByRimBrand = async (filterName: ActiveFilterName, value: number | string) => {
    this.activeParams = INITIAL_ACTIVE_PARAMS
    this.activeParams[filterName][value] = !this.activeParams[filterName][value]
    await this.loadData()
  }

  reloadDataWithNewFilters = async (filter: { parameter: ActiveFilterName; value: number | string }[]) => {
    this.activeParams = INITIAL_ACTIVE_PARAMS
    filter.forEach(({ parameter, value }) => {
      this.activeParams[parameter][value] = !this.activeParams[parameter][value]
    })
    await this.loadData()
  }

  reloadDataFilteredByBrandOrModel = async (filter: { parameter: ActiveFilterName; value: number | string }[]) => {
    this.activeParams = INITIAL_ACTIVE_PARAMS
    filter.forEach(({ parameter, value }) => {
      this.activeParams[parameter][value] = !this.activeParams[parameter][value]
    })
    // await this.loadAssortmentFiltered()
    await this.loadAssortmentFilteredGrouped()
  }

  setPrice = ([min, max]: [number, number]) => {
    let changed

    if (this.activeParams.price.min !== min) {
      this.activeParams.price = { ...this.activeParams.price, min }
      changed = true
    }

    if (this.activeParams.price.max !== max) {
      this.activeParams.price = { ...this.activeParams.price, max }
      changed = true
    }

    if (changed) {
      if (searchCarStore.isCarSelected) {
        // searchCarStore.loadSpecifiedCarFiltered({ offset: 1, limit: LOAD_AMOUNT })
        searchCarStore.loadSpecifiedCarFilteredGrouped({ offset: 1, limit: LOAD_AMOUNT })
      } else {
        // this.loadAssortmentFiltered()
        this.loadAssortmentFilteredGrouped()
      }
    }
  }

  resetFilterByGroup = async (groupName: ActiveFilterName) => {
    this.activeParams[groupName] = INITIAL_ACTIVE_PARAMS[groupName]
    if (groupName === 'carModel' || groupName === 'carBrand') {
      searchCarStore.activeModel = undefined
      searchCarStore.activeBrand = undefined
      searchCarStore.setCurrentStep(1)
    }

    if (searchCarStore.isCarSelected) {
      // await searchCarStore.loadSpecifiedCarFiltered({ offset: 1, limit: LOAD_AMOUNT })
      await searchCarStore.loadSpecifiedCarFilteredGrouped({ offset: 1, limit: LOAD_AMOUNT })
    } else {
      // await this.loadAssortmentFiltered()
      await this.loadAssortmentFilteredGrouped()
    }

    await this.reloadAvailableParams()
  }

  getRimPassport = async () => {
    try {
      const rimPassport = await getRimPassport()
      const file = new Blob([rimPassport], { type: 'application/pdf' })
      const fileUrl = URL.createObjectURL(file)
      window.open(fileUrl)
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message)
      }
    }
  }

  get localizedSort(): string {
    return SORT_LOCALIZED[this.sortDirection as keyof typeof SORT_LOCALIZED]
  }

  setLocalizedSort = async (sort: string) => {
    this.sortDirection = sort === 'Сначала дешевые' ? 'Asc' : 'Desc'
    // await rimsStore.getRims({})
    await rimsStore.getGroupedRims({})
  }
}

export const rimsStore = new RimsStore()
