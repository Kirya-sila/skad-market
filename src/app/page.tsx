import { Suspense } from 'react'
import { MainPage } from '@/pages/main-page'
import { Spinner } from '@/shared/ui/Spinner'

export default function Home() {
  return (
    <Suspense fallback={<Spinner />}>
      <MainPage />
    </Suspense>
  )
}