import { apiRoutes } from '@/app-settings'
import { IRecommendRimsItemsData, IRecommendRimsItemsDataGrouped } from '@/interfaces'
import { httpClient } from '@/shared/api/httpClient'

export const getRecommendRims = async (): Promise<IRecommendRimsItemsData | undefined> => {
  return await httpClient(apiRoutes.getReccomendedItems)
}

export const getRecommendRimsGrouped = async (): Promise<IRecommendRimsItemsDataGrouped | undefined> => {
  return await httpClient(apiRoutes.getReccomendedItemsGrouped)
}
