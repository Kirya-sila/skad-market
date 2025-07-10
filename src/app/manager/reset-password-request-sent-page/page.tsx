import { Suspense } from 'react'
import { ResetPasswordRequestSentPage } from '@/pages/SignIn/ResetPasswordRequestSentPage'
import { Spinner } from '@/shared/ui/Spinner'

export default function ManagerResetPasswordRequestSent() {
  return (
    <Suspense fallback={<Spinner />}>
      <ResetPasswordRequestSentPage />
    </Suspense>
  )
}