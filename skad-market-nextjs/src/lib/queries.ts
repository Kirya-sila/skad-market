import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './api'

// Query keys
export const queryKeys = {
  rims: ['rims'] as const,
  rimDetails: (wheelCode: string) => ['rims', wheelCode] as const,
  cart: ['cart'] as const,
  order: (orderId: string) => ['order', orderId] as const,
  buyerProfile: ['buyer', 'profile'] as const,
  buyerOrders: ['buyer', 'orders'] as const,
  managerOrders: ['manager', 'orders'] as const,
  managerOrder: (orderId: string) => ['manager', 'order', orderId] as const,
}

// Rims queries
export const useRims = (params?: any) => {
  return useQuery({
    queryKey: queryKeys.rims,
    queryFn: () => api.getRims(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useRimDetails = (wheelCode: string) => {
  return useQuery({
    queryKey: queryKeys.rimDetails(wheelCode),
    queryFn: () => api.getRimDetails(wheelCode),
    enabled: !!wheelCode,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Cart queries
export const useCart = () => {
  return useQuery({
    queryKey: queryKeys.cart,
    queryFn: () => api.getCartItems(),
    staleTime: 30 * 1000, // 30 seconds
  })
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (item: any) => api.addToCart(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart })
    },
  })
}

// Order queries
export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: queryKeys.order(orderId),
    queryFn: () => api.getOrder(orderId),
    enabled: !!orderId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (orderData: any) => api.createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart })
    },
  })
}

// Buyer queries
export const useBuyerProfile = () => {
  return useQuery({
    queryKey: queryKeys.buyerProfile,
    queryFn: () => api.getBuyerProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useBuyerOrders = () => {
  return useQuery({
    queryKey: queryKeys.buyerOrders,
    queryFn: () => api.getBuyerOrders(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// Manager queries
export const useManagerOrders = () => {
  return useQuery({
    queryKey: queryKeys.managerOrders,
    queryFn: () => api.getManagerOrders(),
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

export const useManagerOrder = (orderId: string) => {
  return useQuery({
    queryKey: queryKeys.managerOrder(orderId),
    queryFn: () => api.getManagerOrder(orderId),
    enabled: !!orderId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}