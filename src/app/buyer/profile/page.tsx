import { Suspense } from 'react'
import { Spinner } from '@/shared/ui/Spinner'

export default function BuyerProfile() {
  return (
    <Suspense fallback={<Spinner />}>
      <div>Профиль покупателя</div>
    </Suspense>
  )
}