import { ISellerOrdersFilters } from '../model/types'
import { apiRoutes } from '@/app-settings'
import { httpClient } from '@/shared/api/httpClient'

export const fetchSellerOrderFilters = async (): Promise<ISellerOrdersFilters> => {
  const filters: ISellerOrdersFilters = await httpClient(apiRoutes.sellerOrderFilters, {}, 'seller')

  return filters
}
