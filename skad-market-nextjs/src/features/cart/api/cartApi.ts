import { apiRoutes } from '@/app-settings'
import { CartItemBody } from '@/interfaces'
import { httpClient } from '@/shared/api/httpClient'

export const getCart = async () => {
  return await httpClient(apiRoutes.getCart)
}

export const addToCart = async (body: CartItemBody) => {
  return await httpClient(apiRoutes.addToCartItem, { method: 'POST', body })
}

export const deleteCartItems = async (items: string[]) => {
  return await httpClient(apiRoutes.deleteCartItems, {
    method: 'DELETE',
    body: { ids: items },
  })
}

export const updateCartItem = async (body: { id: string; quantity: number }) => {
  return await httpClient(apiRoutes.updateCartItem, { method: 'PUT', body })
}

export const restoreDeletedItem = async (item: string) => {
  return await httpClient(apiRoutes.restoreCartItem, {
    method: 'POST',
    body: item,
  })
}
