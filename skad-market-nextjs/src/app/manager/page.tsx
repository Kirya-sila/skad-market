'use client'

import { observer } from 'mobx-react-lite'
import { ManagerHomePage } from '@/components/manager/ManagerHomePage'
import { useManagerOrders } from '@/lib/queries'

const ManagerPage = observer(() => {
  const { data: orders, isLoading } = useManagerOrders()
  return <ManagerHomePage orders={orders} isLoading={isLoading} />
})

export default ManagerPage