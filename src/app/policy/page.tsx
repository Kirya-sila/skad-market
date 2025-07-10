import { Suspense } from 'react'
import { Spinner } from '@/shared/ui/Spinner'

export default function Policy() {
  return (
    <Suspense fallback={<Spinner />}>
      <div>Политика конфиденциальности</div>
    </Suspense>
  )
}