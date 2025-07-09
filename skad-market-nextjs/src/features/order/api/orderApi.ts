import { apiRoutes } from '@/app-settings'
import { getQueryFromObject } from '@/helpers'
import {
  IBaseResponse,
  IBuyerContactInfo,
  IBuyerContactInfoResponse,
  IDeleteDeliveryItemOptions,
  IDeliveryAddress,
  IDeliveryOptionsWithItems,
  IUserDeliveryItem,
} from '@/interfaces'
import { httpClient } from '@/shared/api/httpClient'
import { handleCatchedError } from '@/shared/libs'

interface IInitOrder extends IBaseResponse {
  content: { orderId: string }
}

interface IGetParcelShopsByQuery {
  orderId: string
  cityName?: string
  query: string
  count?: number
}

export const initOrder = async (ids: string[]): Promise<IInitOrder> => {
  return await httpClient(apiRoutes.initOrder, {
    method: 'POST',
    body: { cartItemsIds: ids },
  })
}

export const getOrder = async (orderId: string) => {
  return await httpClient(`${apiRoutes.getOrder}${getQueryFromObject({ orderId })}`)
}

export const deleteOrderItem = async (orderItemId: string) => {
  await httpClient(apiRoutes.deleteOrderItem, {
    method: 'DELETE',
    body: { orderItemId },
  })
}

export const saveBuyerInfo = async (orderId: string, contactInfo: IBuyerContactInfo) => {
  return await httpClient(apiRoutes.saveOrderContacts, {
    method: 'POST',
    body: { ...contactInfo, orderId },
  })
}

export const getBuyerInfo = async (orderId: string): Promise<IBuyerContactInfoResponse | undefined> => {
  return await httpClient(`${apiRoutes.getOrderContacts}${getQueryFromObject({ orderId })}`)
}

export const submitOrder = async (orderId: string) => {
  return await httpClient(`${apiRoutes.commitOrder}${getQueryFromObject({ orderId })}`, {
    method: 'PUT',
  })
}

export const getAddresses = async (value: string) => {
  try {
    return await httpClient(`${apiRoutes.getAddresses}${getQueryFromObject({ query: value })}`)
  } catch (e) {
    handleCatchedError(e)
  }
}

export const getDeliveryPointsByQuery = async ({ orderId, query, cityName, count = 10 }: IGetParcelShopsByQuery) => {
  const baseQueryParams = { orderId, query, count: count.toString() }
  const queryParams = cityName ? { ...baseQueryParams, cityName } : baseQueryParams
  try {
    return await httpClient(`${apiRoutes.getDeliveryPointsByQuery}${getQueryFromObject(queryParams)}`)
  } catch (e) {
    handleCatchedError(e)
  }
}

export const getAllDeliveryPoints = async ({ orderId }: { orderId: string }) => {
  try {
    return await httpClient(`${apiRoutes.getDeliveryPointsByQuery}${getQueryFromObject({ orderId })}`)
  } catch (e) {
    handleCatchedError(e)
  }
}

export const confirmDeliveryPoint = async (parcelShopId: string) => {
  try {
    return await httpClient(apiRoutes.addDeliveryPointAddress, {
      method: 'POST',
      body: { parcelShopId },
    })
  } catch (e) {
    handleCatchedError(e)
  }
}

export const confirmDeliveryAddress = async (addressInfo: IDeliveryAddress) => {
  return await httpClient(apiRoutes.addUserDeliveryAddress, {
    method: 'POST',
    body: { ...addressInfo },
  })
}

export const getUserDeliveryItems = async (): Promise<IUserDeliveryItem[] | undefined> => {
  try {
    return await httpClient(apiRoutes.getAllDeliveryAddresses)
  } catch (e) {
    handleCatchedError(e)
  }
}

export const setDeliveryPointToOrderItems = async (deliveryOptions: IDeliveryOptionsWithItems) => {
  return await httpClient(apiRoutes.setDeliveryPointToOrderItems, {
    method: 'POST',
    body: deliveryOptions,
  })
}

export const deleteDeliveryItem = async (deleteOptions: IDeleteDeliveryItemOptions) => {
  return await httpClient(apiRoutes.deleteDeliveryOrderItem, {
    method: 'DELETE',
    body: deleteOptions,
  })
}
