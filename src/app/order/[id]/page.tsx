import { Suspense } from 'react'
import { Order } from '@/pages/Order'
import { Spinner } from '@/shared/ui/Spinner'

interface OrderPageProps {
  params: {
    id: string
  }
}

export default function OrderPage({ params }: OrderPageProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <Order orderId={params.id} />
    </Suspense>
  )
}