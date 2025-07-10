import React from 'react'

interface BuyerOrderPageProps {
  order: any
  isLoading: boolean
}

export const BuyerOrderPage = ({ order, isLoading }: BuyerOrderPageProps) => (
  <div>
    <h1>Order Details</h1>
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>Order #{order?.id}</div>
    )}
  </div>
)