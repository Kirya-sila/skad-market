import { Suspense } from 'react'
import { MainPage } from '@/pages/main-page'
import { Spinner } from '@/shared/ui/Spinner'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SKAD Market - Автозапчасти и аксессуары',
  description: 'Качественные автозапчасти, диски, шины и аксессуары для вашего автомобиля. Быстрая доставка по всей России.',
  keywords: 'автозапчасти, диски, шины, аксессуары, автомобиль',
  openGraph: {
    title: 'SKAD Market - Автозапчасти и аксессуары',
    description: 'Качественные автозапчасти, диски, шины и аксессуары для вашего автомобиля',
    type: 'website',
  },
}

export default function Home() {
  return (
    <Suspense fallback={<Spinner />}>
      <MainPage />
    </Suspense>
  )
}