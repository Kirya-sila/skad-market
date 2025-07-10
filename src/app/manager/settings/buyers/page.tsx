import { Suspense } from 'react'
import { Buyers } from '@/pages/Manager/ManagerSettings/Buyers'
import { Spinner } from '@/shared/ui/Spinner'

export default function ManagerBuyers() {
  return (
    <Suspense fallback={<Spinner />}>
      <Buyers />
    </Suspense>
  )
}