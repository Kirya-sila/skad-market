import { Suspense } from 'react'
import { CatalogItem } from '@/pages/rims/item'
import { Spinner } from '@/shared/ui/Spinner'

interface RimPageProps {
  params: {
    wheelCode: string
  }
}

export default function RimPage({ params }: RimPageProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <CatalogItem wheelCode={params.wheelCode} />
    </Suspense>
  )
}

// Генерируем статические пути для популярных дисков
export async function generateStaticParams() {
  // Здесь можно добавить логику для генерации статических путей
  // Например, получить список популярных дисков из API
  return [
    { wheelCode: 'example-wheel-1' },
    { wheelCode: 'example-wheel-2' },
  ]
}