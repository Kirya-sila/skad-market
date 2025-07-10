import { Suspense } from 'react'
import { BuyerOrdersPage } from '@/pages/BuyerCabinet/BuyerOrdersPage'
import { Spinner } from '@/shared/ui/Spinner'

export default function BuyerOrders() {
  return (
    <Suspense fallback={<Spinner />}>
      <BuyerOrdersPage />
    </Suspense>
  )
}