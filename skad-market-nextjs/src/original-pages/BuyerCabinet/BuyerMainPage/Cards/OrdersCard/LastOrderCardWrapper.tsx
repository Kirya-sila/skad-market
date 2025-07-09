import { FC, ReactNode } from 'react'
import { Flex, Typography } from 'antd'
import { primaryDarkGray, primaryLightestGray } from '@/theme'

const { Text } = Typography

export const LastOrderCardWrapper: FC<{ children: ReactNode; onClick?: VoidFunction }> = ({ children, onClick }) => {
  return (
    <Flex vertical gap={8}>
      <Text style={{ fontSize: 12, color: primaryDarkGray }}>Последний заказ</Text>
      <Flex
        style={{ backgroundColor: primaryLightestGray, borderRadius: 12, padding: 24, cursor: 'pointer' }}
        onClick={onClick}
      >
        {children}
      </Flex>
    </Flex>
  )
}
