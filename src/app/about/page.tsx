import { Suspense } from 'react'
import { About } from '@/widgets/About'
import { Spinner } from '@/shared/ui/Spinner'

export default function AboutPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <About />
    </Suspense>
  )
}