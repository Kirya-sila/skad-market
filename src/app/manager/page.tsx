import { Suspense } from 'react'
import { ManagerHomePage } from '@/pages/Manager'
import { Spinner } from '@/shared/ui/Spinner'

export default function Manager() {
  return (
    <Suspense fallback={<Spinner />}>
      <ManagerHomePage />
    </Suspense>
  )
}