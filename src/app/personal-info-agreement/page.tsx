import { Suspense } from 'react'
import { Spinner } from '@/shared/ui/Spinner'

export default function PersonalInfoAgreement() {
  return (
    <Suspense fallback={<Spinner />}>
      <div>Соглашение о персональных данных</div>
    </Suspense>
  )
}