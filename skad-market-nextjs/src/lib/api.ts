import { apiRoutes } from '@/app-settings'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(url, config)
  
  if (!response.ok) {
    throw new ApiError(response.status, `HTTP error! status: ${response.status}`)
  }

  const result: ApiResponse<T> = await response.json()
  
  if (!result.success) {
    throw new ApiError(400, result.message || 'API request failed')
  }

  return result.data
}

// API functions for different endpoints
export const api = {
  // Rims
  getRims: (params?: any) => apiRequest(apiRoutes.getRimAssortmentFiltered, {
    method: 'POST',
    body: JSON.stringify(params),
  }),
  
  getRimDetails: (wheelCode: string) => apiRequest(`${apiRoutes.rimDetails}/${wheelCode}`),
  
  // Cart
  getCartItems: () => apiRequest(apiRoutes.getCartItems),
  addToCart: (item: any) => apiRequest(apiRoutes.addToCartItem, {
    method: 'POST',
    body: JSON.stringify(item),
  }),
  
  // Orders
  getOrder: (orderId: string) => apiRequest(`${apiRoutes.getOrder}/${orderId}`),
  createOrder: (orderData: any) => apiRequest(apiRoutes.initOrder, {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
  
  // User
  getBuyerProfile: () => apiRequest(apiRoutes.client.profile),
  getBuyerOrders: () => apiRequest(apiRoutes.client.orders.root),
  
  // Manager
  getManagerOrders: () => apiRequest(apiRoutes.sellerOrders),
  getManagerOrder: (orderId: string) => apiRequest(`${apiRoutes.getManagersOrder}/${orderId}`),
}

export { ApiError }