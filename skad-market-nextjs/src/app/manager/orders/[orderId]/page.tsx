'use client'

import React from 'react'
import { ManagerOrder } from '@/components/manager/ManagerOrder'
import { useManagerOrder } from '@/lib/queries'

interface ManagerOrderPageProps {
  params: { orderId: string }
}

export default function ManagerOrderPage({ params }: ManagerOrderPageProps) {
  const { orderId } = params
  const { data: order, isLoading } = useManagerOrder(orderId)

  return <ManagerOrder order={order} isLoading={isLoading} />
}