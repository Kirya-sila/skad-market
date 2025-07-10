import { Suspense } from 'react'
import { ManagerSignIn } from '@/pages/SignIn/SellerSignIn'
import { Spinner } from '@/shared/ui/Spinner'

export default function ManagerSignInPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ManagerSignIn />
    </Suspense>
  )
}