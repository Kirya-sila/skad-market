import React from 'react'

interface ManagerHomePageProps {
  orders: any[]
  isLoading: boolean
}

export const ManagerHomePage = ({ orders, isLoading }: ManagerHomePageProps) => (
  <div>
    <h1>Manager Dashboard</h1>
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