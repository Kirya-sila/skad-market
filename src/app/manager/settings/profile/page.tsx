import { Suspense } from 'react'
import { Spinner } from '@/shared/ui/Spinner'

export default function ManagerProfile() {
  return (
    <Suspense fallback={<Spinner />}>
      <div>Профиль менеджера</div>
    </Suspense>
  )
}