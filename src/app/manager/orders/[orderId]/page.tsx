import { Suspense } from 'react'
import { ManagerOrder } from '@/pages/Manager/ManagerOrder'
import { Spinner } from '@/shared/ui/Spinner'

interface ManagerOrderPageProps {
  params: {
    orderId: string
  }
}

export default function ManagerOrderPage({ params }: ManagerOrderPageProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <ManagerOrder orderId={params.orderId} />
    </Suspense>
  )
}