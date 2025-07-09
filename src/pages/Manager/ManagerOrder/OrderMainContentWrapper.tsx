import { FC, ReactNode } from 'react'
import { Flex } from 'antd'
import { primaryLightestGray } from '@/theme'

interface IOrderMainContentWrapper {
  children: ReactNode
}

export const OrderMainContentWrapper: FC<IOrderMainContentWrapper> = ({ children }) => {
  return (
    <Flex
      vertical
      style={{
        backgroundColor: primaryLightestGray,
        padding: '32px 40px',
        borderRadius: 20,
        width: '100%',
        marginBottom: 32,
      }}
    >
      {children}
    </Flex>
  )
}
