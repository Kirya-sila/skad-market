import { Suspense } from 'react'
import { Catalog } from '@/pages/rims/catalog'
import { Spinner } from '@/shared/ui/Spinner'

export default function RimsPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Catalog />
    </Suspense>
  )
}