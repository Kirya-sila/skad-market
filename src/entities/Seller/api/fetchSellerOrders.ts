import { IExpandedOrder, ChunkSizeType, ISellerOrdersFilters, IOrdersResponse } from '../model/types'
import { apiRoutes } from '@/app-settings'
import { getUrlWithSearchParams } from '@/helpers'
import { httpClient } from '@/shared/api/httpClient'

export const fetchSellerOrders = async (
  chunkSize: ChunkSizeType,
  chunkNumber: number,
  dateStart: string | null = null,
  dateEnd: string | null = null,
  orderNum: string | null = null,
  selectedFilters: ISellerOrdersFilters | null = null,
): Promise<IOrdersResponse | undefined> => {
  const perm = '&OrderFilterParams.'
  let dates = ''
  let num = ''
  let filters = ''
  if (dateStart && dateEnd) {
    dates = `${perm}CreationDateStartRange=${dateStart}${perm}CreationDateEndRange=${dateEnd}`
  }
  if (orderNum) {
    num = `${perm}InternalNumber=${orderNum}`
  }
  if (selectedFilters) {
    for (const value in selectedFilters) {
      selectedFilters[value as keyof ISellerOrdersFilters]?.forEach((item) => {
        filters += perm + value + '=' + item
      })
    }
  }

  const orders = await httpClient(
    getUrlWithSearchParams(apiRoutes.sellerOrders, { chunkNumber, chunkSize, dates, orderNum, filters }),
    {},
    'seller',
  )

  return orders
}
