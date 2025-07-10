import { Suspense } from 'react'
import { ManagerOrders } from '@/pages/Manager/ManagerOrders'
import { Spinner } from '@/shared/ui/Spinner'

export default function ManagerOrdersPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ManagerOrders />
    </Suspense>
  )
}