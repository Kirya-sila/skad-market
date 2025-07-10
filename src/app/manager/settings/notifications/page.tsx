import { Suspense } from 'react'
import { Spinner } from '@/shared/ui/Spinner'

export default function ManagerNotifications() {
  return (
    <Suspense fallback={<Spinner />}>
      <div>Уведомления менеджера</div>
    </Suspense>
  )
}