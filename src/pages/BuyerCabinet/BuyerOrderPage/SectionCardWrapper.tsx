import { FC, ReactNode } from 'react'
import { Flex } from 'antd'
import { primaryLightestGray } from '@/theme'

interface ISectionCardWrapper {
  children: ReactNode
  padding?: string
}

export const SectionCardWrapper: FC<ISectionCardWrapper> = ({ children, padding = '32px 40px' }) => {
  return (
    <Flex style={{ backgroundColor: primaryLightestGray, borderRadius: 20, padding }}>{children}</Flex>
  )
}
