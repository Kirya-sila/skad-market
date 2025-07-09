import { httpClient } from '@shared/api/httpClient'
import { apiRoutes } from '@/app-settings'
import { groupModelsByFirstLetter } from '@/features/SearchCar/model/groupModelsByFirstLetter'
import { BrandModels, BrandStructure } from '@/features/SearchCar/model/types'

export const fetchBrandModels = async (brandName: string): Promise<BrandStructure> => {
  const data: BrandModels = await httpClient(`${apiRoutes.modelsByBrand}?BrandName=${brandName}`)

  return groupModelsByFirstLetter(brandName, data)
}
