import { FC, ReactNode } from 'react'
import { Flex } from 'antd'

interface OrderCardWrapper {
  children: ReactNode
  onClick?: VoidFunction
}

export const OrderCardWrapper: FC<OrderCardWrapper> = ({ children, onClick }) => {
  return (
    <Flex
      style={{
        padding: 24,
        borderRadius: 20,
        boxShadow: '0px 8px 40px 0px #1C283317, 0px 2px 10px 0px #1C28330A',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {children}
    </Flex>
  )
}
