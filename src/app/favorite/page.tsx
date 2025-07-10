import { Suspense } from 'react'
import { Spinner } from '@/shared/ui/Spinner'

export default function Favorite() {
  return (
    <Suspense fallback={<Spinner />}>
      <div>Избранное</div>
    </Suspense>
  )
}