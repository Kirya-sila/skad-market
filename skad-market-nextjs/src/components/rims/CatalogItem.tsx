import React from 'react'

interface CatalogItemProps {
  rimDetails: any
}

export const CatalogItem = ({ rimDetails }: CatalogItemProps) => (
  <div>Rim details for {rimDetails?.wheelCode}</div>
)