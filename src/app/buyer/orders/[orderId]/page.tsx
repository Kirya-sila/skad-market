import { Suspense } from 'react'
import { BuyerOrderPage } from '@/pages/BuyerCabinet/BuyerOrderPage'
import { Spinner } from '@/shared/ui/Spinner'

interface BuyerOrderPageProps {
  params: {
    orderId: string
  }
}

export default function BuyerOrder({ params }: BuyerOrderPageProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <BuyerOrderPage orderId={params.orderId} />
    </Suspense>
  )
}