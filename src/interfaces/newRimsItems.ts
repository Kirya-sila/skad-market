import { IBaseResponse } from './api'
import { IRimItemsGroup, RimDTO } from '@/entities/Rims/model/types'

export interface INewRimsItemsData extends IBaseResponse {
  content: RimDTO[]
}

export interface INewRimsItemsDataGrouped extends IBaseResponse {
  content: IRimItemsGroup[]
}
