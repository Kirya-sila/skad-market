import { Suspense } from 'react'
import { Spinner } from '@/shared/ui/Spinner'

export default function Components() {
  return (
    <Suspense fallback={<Spinner />}>
      <div>Комплектующие</div>
    </Suspense>
  )
}