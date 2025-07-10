import React from 'react'

interface OrderLayoutProps {
  children: React.ReactNode
}

export const OrderLayout = ({ children }: OrderLayoutProps) => (
  <div className='order-layout'>{children}</div>
)