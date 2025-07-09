import { FC, ReactNode } from 'react'
import { Flex } from 'antd'

interface IBuyerRow {
  icon: ReactNode
  text: string
}

export const BuyerRow: FC<IBuyerRow> = ({ icon, text }) => {
  return (
    <Flex align='center' gap={6}>
      {icon}
      <span style={{lineHeight:'24px'}}>{text}</span>
    </Flex>
  )
}
