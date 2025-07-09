import { RimAssortmentPageResponseGrouped, RimAssortmentPageRequest, RimAssortmentPageResponse } from '@entities/Rims/model/types'
import { httpClient } from '@shared/api/httpClient'
import { apiRoutes } from '@/app-settings'

export const fetchRimAssortmentPage = async ({
  offset,
  limit,
  sortDirection,
}: RimAssortmentPageRequest): Promise<RimAssortmentPageResponse> => {
  const sortParamsString = sortDirection ? `&SortParams.SortBy=Price&SortParams.SortDirection=${sortDirection}` : ''
  return await httpClient(`${apiRoutes.gerRimAssortmentPage}?ChunkNumber=${offset}&ChunkSize=${limit}${sortParamsString}`)
}

export const fetchRimAssortmentPageGrouped = async ({
  offset,
  limit,
  sortDirection,
}: RimAssortmentPageRequest): Promise<RimAssortmentPageResponseGrouped> => {
  const sortParamsString = sortDirection ? `&SortParams.SortBy=Price&SortParams.SortDirection=${sortDirection}` : ''
  return await httpClient(`${apiRoutes.gerRimAssortmentPageGrouped}?ChunkNumber=${offset}&ChunkSize=${limit}${sortParamsString}`)
}
