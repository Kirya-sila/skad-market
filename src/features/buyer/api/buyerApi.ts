import { apiRoutes } from '@/app-settings'
import { getUrlWithSearchParams } from '@/helpers'
import { IBuyerProfileInfo, ICancelOrderBody, IMenuItemsCount } from '@/interfaces'
import { httpClient } from '@/shared/api/httpClient'

export const getMenuItemsCount = async (): Promise<IMenuItemsCount> => {
  return await httpClient(getUrlWithSearchParams(apiRoutes.client.menuItemsCount, { onlyActiveOrders: 'true' }))
}

export const getProfileInfo = async () => {
  return await httpClient(apiRoutes.client.profile)
}

export const changeProfile = async (body: IBuyerProfileInfo) => {
  return await httpClient(apiRoutes.client.profile, { method: 'POST', body })
}

export const getNotifications = async (page?: number, pageSize?: number) => {
  return await httpClient(getUrlWithSearchParams(apiRoutes.client.notifications, { page, pageSize }))
}

export const getOrders = async (page?: number, pageSize?: number) => {
  return await httpClient(getUrlWithSearchParams(apiRoutes.client.orders.root, { page, pageSize }))
}

export const getOneOrder = async (orderId: string) => {
  return await httpClient(getUrlWithSearchParams(apiRoutes.client.orders.orderItem, { orderId }))
}

export const cancelBuyerOrder = async (body: ICancelOrderBody) => {
  await httpClient(apiRoutes.client.orders.orderItem, { method: 'DELETE', body })
}
