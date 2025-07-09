import { BrandStructure, Entry } from '@/features/SearchCar/model/types'

export const groupModelsByFirstLetter = (brand: string, models: string[]): BrandStructure => {
  const groupedModels: { [key: string]: string[] } = {}

  models.forEach((model) => {
    const firstLetter = model[0].toUpperCase()

    ;(groupedModels[firstLetter] ||= []).push(model)
  })

  const entries: Entry[] = Object.entries(groupedModels)

  return { title: brand, entries }
}
