import { Suspense } from 'react'
import { UIKitPage } from '@/pages/uikit-page'
import { Spinner } from '@/shared/ui/Spinner'

export default function Dev() {
  return (
    <Suspense fallback={<Spinner />}>
      <UIKitPage />
    </Suspense>
  )
}