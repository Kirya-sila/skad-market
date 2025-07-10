import { Suspense } from 'react'
import { CartPage } from '@/pages/Cart'
import { Spinner } from '@/shared/ui/Spinner'

export default function Cart() {
  return (
    <Suspense fallback={<Spinner />}>
      <CartPage />
    </Suspense>
  )
}