import { apiRoutes } from '@/app-settings'
import { INewRimsItemsData, INewRimsItemsDataGrouped } from '@/interfaces'
import { httpClient } from '@/shared/api/httpClient'

export const getNewRims = async (): Promise<INewRimsItemsData | undefined> => {
  return await httpClient(apiRoutes.getNewRims)
}

export const getNewRimsGrouped = async (): Promise<INewRimsItemsDataGrouped | undefined> => {
  return await httpClient(apiRoutes.getNewRimsGrouped)
}
