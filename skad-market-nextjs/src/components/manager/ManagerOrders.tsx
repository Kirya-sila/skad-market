import React from 'react'

interface ManagerOrdersProps {
  orders: any[]
  isLoading: boolean
}

export const ManagerOrders = ({ orders, isLoading }: ManagerOrdersProps) => (
  <div>
    <h1>Manager Orders</h1>
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <ul>
        {orders?.map((order) => (
          <li key={order.id}>Order #{order.id}</li>
        ))}
      </ul>
    )}
  </div>
)