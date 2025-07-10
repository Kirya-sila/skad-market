import { Suspense } from 'react'
import { SignInContainer } from '@/pages/SignIn'
import { Spinner } from '@/shared/ui/Spinner'

export default function SignIn() {
  return (
    <Suspense fallback={<Spinner />}>
      <SignInContainer />
    </Suspense>
  )
}