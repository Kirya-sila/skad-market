'use client'

import React from 'react'
import { BuyerOrderPage } from '@/components/buyer/BuyerOrderPage'
import { useOrder } from '@/lib/queries'

interface BuyerOrderPageProps {
  params: { orderId: string }
}

export default function BuyerOrderDetailPage({ params }: BuyerOrderPageProps) {
  const { orderId } = params
  const { data: order, isLoading } = useOrder(orderId)

  return <BuyerOrderPage order={order} isLoading={isLoading} />
}