import { RimDTO } from '../model/types'
import { apiRoutes } from '@/app-settings'
import { getUrlWithSearchParams } from '@/helpers'
import { httpClient } from '@/shared/api/httpClient'

export const fetchOneRim = async (wheelCode: string | number, carId = 0): Promise<RimDTO[]> => {
  const data: RimDTO[] = await httpClient(getUrlWithSearchParams(apiRoutes.rimDetails, { id: wheelCode, CarId: carId }))
  return data
}