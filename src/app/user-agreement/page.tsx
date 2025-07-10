import { Suspense } from 'react'
import { Spinner } from '@/shared/ui/Spinner'

export default function UserAgreement() {
  return (
    <Suspense fallback={<Spinner />}>
      <div>Пользовательское соглашение</div>
    </Suspense>
  )
}