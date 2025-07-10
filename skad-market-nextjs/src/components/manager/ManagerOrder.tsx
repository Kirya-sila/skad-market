import React from 'react'

interface ManagerOrderProps {
  order: any
  isLoading: boolean
}

export const ManagerOrder = ({ order, isLoading }: ManagerOrderProps) => (
  <div>
    <h1>Manager Order Details</h1>
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>Order #{order?.id}</div>
    )}
  </div>
)