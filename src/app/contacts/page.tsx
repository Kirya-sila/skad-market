import { Suspense } from 'react'
import { Spinner } from '@/shared/ui/Spinner'

export default function Contacts() {
  return (
    <Suspense fallback={<Spinner />}>
      <div>Контакты</div>
    </Suspense>
  )
}