import { Suspense } from 'react'
import { ResetPassword } from '@/pages/SignIn/ResetPassword'
import { Spinner } from '@/shared/ui/Spinner'

export default function ManagerForgetPassword() {
  return (
    <Suspense fallback={<Spinner />}>
      <ResetPassword />
    </Suspense>
  )
}