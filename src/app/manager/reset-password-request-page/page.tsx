import { Suspense } from 'react'
import { ResetPasswordRequestPage } from '@/pages/SignIn/ResetPasswordRequestPage'
import { Spinner } from '@/shared/ui/Spinner'

export default function ManagerResetPasswordRequest() {
  return (
    <Suspense fallback={<Spinner />}>
      <ResetPasswordRequestPage />
    </Suspense>
  )
}