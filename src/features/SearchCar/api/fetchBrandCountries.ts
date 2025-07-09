import { httpClient } from '@shared/api/httpClient'
import { apiRoutes } from '@/app-settings'
import { BrandCountries } from '@/features/SearchCar/model/types'

export const fetchBrandCountries = async (): Promise<BrandCountries | undefined> => {
  const data = await httpClient(apiRoutes.brandByCountries)

  return data
}
