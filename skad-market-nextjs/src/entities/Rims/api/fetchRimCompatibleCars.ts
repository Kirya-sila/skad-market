import { RimCompatibleCarType } from '../model/types'
import { apiRoutes } from '@/app-settings'
import { getUrlWithSearchParams } from '@/helpers'
import { httpClient } from '@/shared/api/httpClient'

export const fetchRimCompatibleCars = async (wheelCode: string | number): Promise<RimCompatibleCarType[]> => {
  const data: RimCompatibleCarType[] = await httpClient(
    getUrlWithSearchParams(apiRoutes.rimCompatibleCars, { id: wheelCode }),
  )
  return data
}