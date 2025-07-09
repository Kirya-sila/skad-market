import { apiRoutes } from '@/app-settings'
import { RimAssortmentPageResponseGrouped, RimAssortmentPageResponse } from '@/entities/Rims/model/types'
import { SpecifiedCarFilteredRequest, SpecifiedCarResponse } from '@/features/SearchCar/model/types'
import { getUrlWithSearchParams } from '@/helpers'
import { httpClient } from '@shared/api/httpClient'
import { transformParamsToString } from '@shared/api/transformParamsToString'

export const fetchSpecifiedCarFiltered = async ({
  offset: ChunkNumber,
  limit: ChunkSize,
  CarId,
  filterRimParams,
  ApplicabilityParam,
  sortDirection,
}: SpecifiedCarFilteredRequest): Promise<RimAssortmentPageResponse> => {
  const stringFilterRimParams = filterRimParams ? transformParamsToString(filterRimParams, 'FilterRimParams') : ''
  const sortParamsString = sortDirection
    ? `&FilterRimParams.SortParams.SortBy=Price&FilterRimParams.SortParams.SortDirection=${sortDirection}`
    : ''

  return await httpClient(
    `${getUrlWithSearchParams(apiRoutes.getRimAssortmentSpecifiedCar, {
      ChunkNumber,
      ChunkSize,
      CarId,
      ApplicabilityParam,
    })}&${stringFilterRimParams}${sortParamsString}`,
  )
  // return await httpClient(
  //   `${apiRoutes.getRimAssortmentSpecifiedCar}?ChunkNumber=${offset}&ChunkSize=${limit}&CarId=${CarId}&ApplicabilityParam=${ApplicabilityParam}&${stringFilterRimParams}${sortParamsString}`,
  // )
}

export const fetchSpecifiedCarFilteredGrouped = async ({
  offset: ChunkNumber,
  limit: ChunkSize,
  CarId,
  filterRimParams,
  ApplicabilityParam,
  sortDirection,
}: SpecifiedCarFilteredRequest): Promise<RimAssortmentPageResponseGrouped> => {
  const stringFilterRimParams = filterRimParams ? transformParamsToString(filterRimParams, 'FilterRimParams') : ''
  const sortParamsString = sortDirection
    ? `&FilterRimParams.SortParams.SortBy=Price&FilterRimParams.SortParams.SortDirection=${sortDirection}`
    : ''

  return await httpClient(
    `${getUrlWithSearchParams(apiRoutes.getRimAssortmentSpecifiedCarGrouped, {
      ChunkNumber,
      ChunkSize,
      CarId,
      ApplicabilityParam,
    })}&${stringFilterRimParams}${sortParamsString}`,
  )
}
