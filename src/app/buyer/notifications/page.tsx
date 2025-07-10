import { Suspense } from 'react'
import { Spinner } from '@/shared/ui/Spinner'

export default function BuyerNotifications() {
  return (
    <Suspense fallback={<Spinner />}>
      <div>Уведомления</div>
    </Suspense>
  )
}