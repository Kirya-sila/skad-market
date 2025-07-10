'use client'

import React from 'react'
import { ManagerOrders } from '@/components/manager/ManagerOrders'
import { useManagerOrders } from '@/lib/queries'

export default function ManagerOrdersPage() {
  const { data: orders, isLoading } = useManagerOrders()

  return <ManagerOrders orders={orders} isLoading={isLoading} />
}