import { CatalogItem } from '@/pages/rims/item'

interface RimPageProps {
  params: {
    wheelCode: string
  }
}

export default function RimPage({ params }: RimPageProps) {
  return <CatalogItem wheelCode={params.wheelCode} />
}