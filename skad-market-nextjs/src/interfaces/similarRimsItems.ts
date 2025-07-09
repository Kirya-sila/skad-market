import { IBaseResponse } from './api'
import { IRimItemsGroup, RimDTO } from '@/entities/Rims/model/types'

export interface ISimilarRimsItemsData extends IBaseResponse {
  content: RimDTO[]
}

export interface ISimilarRimsItemsDataGrouped extends IBaseResponse {
  content: IRimItemsGroup[]
}
