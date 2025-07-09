import { makeAutoObservable } from 'mobx'
import { fetchBrandCountries } from '../SearchCar/api/fetchBrandCountries'
import { BrandCountries } from '../SearchCar/model'
import { quickChoiceByCarStore } from '../quickChoice'
import { fetchByMount, fetchByMountAndDiametr, getCarModels } from './api'
import { ByMountAndDiametrItem, ByMountItem, ICarModel } from '@/interfaces'
import { handleCatchedError } from '@/shared/libs'

class PopularCategoriesStore {
  public error: string | null = null
  public isLoading = false

  public byMountData: ByMountItem[] | undefined = undefined
  public byMountAndDiameterData: ByMountAndDiametrItem[] | undefined = undefined
  public brandCountriesData: BrandCountries | undefined = undefined
  public carModels: ICarModel[] = []

  constructor() {
    makeAutoObservable(this)
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

  getByMountData = async () => {
    this.setLoading(true)
    this.setError(null)
    try {
      const newData = await fetchByMount()
      this.byMountData = newData
    } catch (error) {
      this.handleError(error)
    } finally {
      this.setLoading(false)
    }
  }

  getByMountAndDiameterData = async () => {
    this.setLoading(true)
    this.setError(null)
    try {
      const newData = await fetchByMountAndDiametr()
      this.byMountAndDiameterData = newData
    } catch (error) {
      this.handleError(error)
    } finally {
      this.setLoading(false)
    }
  }

  getCarBrandsByCountries = async () => {
    this.setLoading(true)
    this.setError(null)
    try {
      const newData = await fetchBrandCountries()
      this.brandCountriesData = newData
      quickChoiceByCarStore.getBrands(newData ?? [])
    } catch (error) {
      this.handleError(error)
    } finally {
      this.setLoading(false)
    }
  }

  getCarModels = async () => {
    try {
      this.setLoading(true)
      const data = await getCarModels()
      this.setCarModels(data)
    } catch (error) {
      this.handleError(error)
    } finally {
      this.setLoading(false)
    }
  }

  setCarModels = (carModels: ICarModel[] = []) => {
    this.carModels = carModels
  }

  get mappedByMountData() {
    return (this.byMountData || []).map(({ lz, pcd }) => ({ lz, pcd }))
  }

  get mappedByMountAndDiameterData() {
    return (this.byMountAndDiameterData || []).map((x) => ({
      diameter: x.diameter,
      params: x.mountParams,
    }))
  }

  get diameters() {
    return (this.byMountAndDiameterData ?? []).map((x) => x.diameter)
  }

  get mappedByBrandData() {
    const enCollator = new Intl.Collator('en-US')

    const allCars = (this.brandCountriesData || [])
      .flatMap((x) => x.brands)
      .filter((x, index, self) => self.indexOf(x) === index)
      .sort((a, b) => enCollator.compare(a, b))
      .groupBy((x) => x[0].toUpperCase())

    return allCars
  }
}

export const popularCategoriesStore = new PopularCategoriesStore()
