import React from 'react'

interface BuyerOrderCardProps {
  currentOrder: any
}

export const BuyerOrderCard = ({ currentOrder }: BuyerOrderCardProps) => (
  <div>
    <div>Order #{currentOrder.id}</div>
    <div>Status: {currentOrder.status}</div>
    {/* Add more order details here */}
  </div>
)