import { IBaseResponse } from './api'
import { IRimItemsGroup, RimDTO } from '@/entities/Rims/model/types'

export interface IRecommendRimsItemsData extends IBaseResponse {
  content: RimDTO[]
}

export interface IRecommendRimsItemsDataGrouped extends IBaseResponse {
  content: IRimItemsGroup[]
}
