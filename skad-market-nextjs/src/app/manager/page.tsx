'use client'

import React from 'react'
import { observer } from 'mobx-react-lite'
import { ManagerHomePage } from '@/original-pages/Manager/ManagerHomePage'
import { useManagerOrders } from '@/lib/queries'

const ManagerPage = observer(() => {
  const { data: ordersData, isLoading } = useManagerOrders()

  return <ManagerHomePage />
})

ManagerPage.displayName = 'ManagerPage'

export default ManagerPage