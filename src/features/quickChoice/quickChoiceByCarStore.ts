import { makeAutoObservable } from 'mobx'
import { fetchModelGenerations } from '../SearchCar'
import { BrandCountries, Generation, getGenerationLabel } from '../SearchCar/model'
import { getBrandModels } from './api/quickCoiceApi'
import { handleCatchedError } from '@/shared/libs'

class QuickChoiceByCarStore {
  isLoading = false
  checkedBrand = ''
  carModels: string[] = []
  brandsByCountries: BrandCountries = []
  generations: Generation[] = []

  constructor() {
    makeAutoObservable(this)
  }

  getBrands = (brandsByCountries: BrandCountries) => {
    this.brandsByCountries = brandsByCountries
  }

  getModelsByBrand = async (brandName: string) => {
    this.checkedBrand = brandName
    this.isLoading = true
    try {
      const models = await getBrandModels(brandName)
      this.carModels = models ?? []
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.isLoading = false
    }
  }

  getGenerations = async (model: string) => {
    this.isLoading = true
    try {
      const generations = await fetchModelGenerations(this.checkedBrand, model)
      this.generations = generations ?? []
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.isLoading = false
    }
  }

  get carBrandsList() {
    const enCollator = new Intl.Collator('en-US')

    const brandsList = this.brandsByCountries
      .flatMap((x) => x.brands)
      .sort((a, b) => enCollator.compare(a, b))
      .map((brand) => ({ label: brand, value: brand }))
    return brandsList
  }

  get brandModelsList() {
    return this.carModels.map((model) => ({ label: model, value: model }))
  }

  get generationsList() {
    return this.generations.map((generation) => ({ label: getGenerationLabel(generation), value: generation.carId }))
  }
}

export const quickChoiceByCarStore = new QuickChoiceByCarStore()
