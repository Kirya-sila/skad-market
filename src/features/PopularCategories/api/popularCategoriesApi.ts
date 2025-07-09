import { httpClient } from '@shared/api/httpClient'
import { apiRoutes } from '@/app-settings'
import { ByMountAndDiametrItem, ByMountItem, ICarModel } from '@/interfaces'

export const fetchByMount = async (): Promise<ByMountItem[]> => {
  const data: ByMountItem[] = await httpClient('/rim-params/mount-params')

  return data
}

export const fetchByMountAndDiametr = async (): Promise<ByMountAndDiametrItem[]> => {
  const data: ByMountAndDiametrItem[] = await httpClient('/rim-params/diameter-and-mount-params')

  return data
}

export const getCarModels = async (): Promise<ICarModel[] | undefined> => {
  return await httpClient(apiRoutes.getCarModels, {
    method: 'GET',
  })
}
