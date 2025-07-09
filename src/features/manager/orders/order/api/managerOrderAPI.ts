import { apiRoutes } from '@/app-settings'
import { CancelOrderTypes } from '@/constants'
import { getUrlWithSearchParams } from '@/helpers'
import { IManagersList, IManagersOrderData, IOrderChangesHistoryResponse } from '@/interfaces'
import { httpClient } from '@/shared/api/httpClient'

interface ICancelOrderBody {
  orderId: string
  orderCancellationReason: CancelOrderTypes
  comment: string
  managerId: string
}

export const getManagersOrder = async (orderId: string): Promise<IManagersOrderData | undefined> => {
  return await httpClient(getUrlWithSearchParams(apiRoutes.getManagersOrder, { orderId }), {}, 'seller')
}

export const getManagersList = async (): Promise<IManagersList[] | undefined> => {
  return await httpClient(apiRoutes.orderItemManagersList, {}, 'seller')
}

export const setManager = async (orderId: string, managerId: string): Promise<IManagersList[] | undefined> => {
  return await httpClient(apiRoutes.setManagerToOrder, { method: 'PUT', body: { orderId, managerId } }, 'seller')
}

export const getOrderChangesHistory = async (orderId: string): Promise<IOrderChangesHistoryResponse | undefined> => {
  return await httpClient(getUrlWithSearchParams(apiRoutes.getOrderChangesHistory, { orderId }), {}, 'seller')
}

export const cancelOrder = async (body: ICancelOrderBody) => {
  return await httpClient(apiRoutes.cancelOrder, { method: 'PUT', body }, 'seller')
}

export const sendOrderToDelivery = async (body: { orderId: string }) => {
  return await httpClient(apiRoutes.sendOrder, { method: 'POST', body }, 'seller')
}

export const setPlanningShipmentDate = async (body: { orderId: string; planningShipmentDate: string }) => {
  return await httpClient(apiRoutes.setPlanningShipmentDate, { method: 'PUT', body }, 'seller')
}

export const getOrderFormFile = async (orderId: string): Promise<BlobPart> => {
  return await httpClient(getUrlWithSearchParams(apiRoutes.getOrderFormFile, { orderId }), {}, 'seller')
}
