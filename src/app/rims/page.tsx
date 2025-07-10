import { Suspense } from 'react'
import { Catalog } from '@/pages/rims/catalog'
import { Spinner } from '@/shared/ui/Spinner'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Диски - SKAD Market',
  description: 'Широкий выбор литых и штампованных дисков для всех марок автомобилей. Гарантия качества и быстрая доставка.',
  keywords: 'диски, литые диски, штампованные диски, колесные диски, автомобильные диски',
  openGraph: {
    title: 'Диски - SKAD Market',
    description: 'Широкий выбор литых и штампованных дисков для всех марок автомобилей',
    type: 'website',
  },
}

export default function RimsPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Catalog />
    </Suspense>
  )
}