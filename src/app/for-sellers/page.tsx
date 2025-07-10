import { Suspense } from 'react'
import { Spinner } from '@/shared/ui/Spinner'

export default function ForSellers() {
  return (
    <Suspense fallback={<Spinner />}>
      <div>Для продавцов</div>
    </Suspense>
  )
}