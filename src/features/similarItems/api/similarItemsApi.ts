import { apiRoutes } from '@/app-settings'
import { getUrlWithSearchParams } from '@/helpers'
import { INewRimsItemsData, ISimilarRimsItemsDataGrouped } from '@/interfaces'
import { httpClient } from '@/shared/api/httpClient'

export const getSimilarRims = async (wheelCode: string): Promise<INewRimsItemsData | undefined> => {
  return await httpClient(getUrlWithSearchParams(apiRoutes.getSimilarRims, { rimItemId: wheelCode }))
}

export const getSimilarRimsGrouped = async (wheelCode: string): Promise<ISimilarRimsItemsDataGrouped | undefined> => {
  return await httpClient(getUrlWithSearchParams(apiRoutes.getSimilarRimsGrouped, { rimItemId: wheelCode }))
}
