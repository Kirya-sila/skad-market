import { Suspense } from 'react'
import { BuyerCabinet } from '@/pages/BuyerCabinet'
import { Spinner } from '@/shared/ui/Spinner'

export default function Buyer() {
  return (
    <Suspense fallback={<Spinner />}>
      <BuyerCabinet />
    </Suspense>
  )
}