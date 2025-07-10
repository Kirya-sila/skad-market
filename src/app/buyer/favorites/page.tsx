import { Suspense } from 'react'
import { Spinner } from '@/shared/ui/Spinner'

export default function BuyerFavorites() {
  return (
    <Suspense fallback={<Spinner />}>
      <div>Избранное</div>
    </Suspense>
  )
}