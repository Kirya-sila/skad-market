import {
  RimAssortmentFilteredRequest,
  RimAssortmentPageResponse,
  RimAssortmentPageResponseGrouped,
} from '@entities/Rims/model/types'
import { httpClient } from '@shared/api/httpClient'
import { transformParamsToString } from '@shared/api/transformParamsToString'
import { apiRoutes } from '@/app-settings'
import { getUrlWithSearchParams } from '@/helpers'

export const fetchRimAssortmentFiltered = async ({
  offset,
  limit,
  filterRimParams,
  sortDirection,
}: RimAssortmentFilteredRequest): Promise<RimAssortmentPageResponse> => {
  const filterRimParamsString = filterRimParams ? transformParamsToString(filterRimParams, 'FilterRimParams') : ''
  const sortParamsString = sortDirection
    ? `&FilterRimParams.SortParams.SortBy=Price&FilterRimParams.SortParams.SortDirection=${sortDirection}`
    : ''

  const path = getUrlWithSearchParams(apiRoutes.getRimAssortmentFilteredGrouped, {
    ChunkNumber: offset,
    ChunkSize: limit,
  })

  return await httpClient(`${path}&${filterRimParamsString}${sortParamsString}`)
}

export const fetchRimAssortmentFilteredGrouped = async ({
  offset,
  limit,
  filterRimParams,
  sortDirection,
}: RimAssortmentFilteredRequest): Promise<RimAssortmentPageResponseGrouped> => {
  const filterRimParamsString = filterRimParams ? transformParamsToString(filterRimParams, 'FilterRimParams') : ''
  const sortParamsString = sortDirection
    ? `&FilterRimParams.SortParams.SortBy=Price&FilterRimParams.SortParams.SortDirection=${sortDirection}`
    : ''

  const path = getUrlWithSearchParams(apiRoutes.getRimAssortmentFilteredGrouped, {
    ChunkNumber: offset,
    ChunkSize: limit,
  })

  return await httpClient(`${path}&${filterRimParamsString}${sortParamsString}`)
}
