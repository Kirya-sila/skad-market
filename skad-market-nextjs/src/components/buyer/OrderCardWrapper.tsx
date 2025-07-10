import React from 'react'

interface OrderCardWrapperProps {
  children: React.ReactNode
  onClick?: () => void
}

export const OrderCardWrapper = ({ children, onClick }: OrderCardWrapperProps) => (
  <div onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
    {children}
  </div>
)