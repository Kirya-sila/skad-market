import React from 'react'
import { CatalogItem } from '@/components/rims/CatalogItem'
import { useRimDetails } from '@/lib/queries'

interface RimDetailPageProps {
  params: { wheelCode: string }
}

export default function RimDetailPage({ params }: RimDetailPageProps) {
  const { wheelCode } = params
  const { data: rimDetails, isLoading } = useRimDetails(wheelCode)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <CatalogItem rimDetails={rimDetails} />
}