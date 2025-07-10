import { Suspense } from 'react'
import { ConfirmedOrderPage } from '@/pages/ConfirmedOrderPage'
import { Spinner } from '@/shared/ui/Spinner'

interface ConfirmedOrderPageProps {
  params: {
    id: string
  }
}

export default function ConfirmedOrder({ params }: ConfirmedOrderPageProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <ConfirmedOrderPage orderId={params.id} />
    </Suspense>
  )
}