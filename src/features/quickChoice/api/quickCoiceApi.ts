import { apiRoutes } from '@/app-settings'
import { httpClient } from '@/shared/api/httpClient'

export const getBrandModels = async (brandName: string): Promise<string[] | undefined> => {
  const data = await httpClient(`${apiRoutes.modelsByBrand}?BrandName=${brandName}`)

  return data
}
