import { Suspense } from 'react'
import { SadSmilePage } from '@/pages/SadSmilePage'
import { Spinner } from '@/shared/ui/Spinner'

export default function SadSmile() {
  return (
    <Suspense fallback={<Spinner />}>
      <SadSmilePage />
    </Suspense>
  )
}