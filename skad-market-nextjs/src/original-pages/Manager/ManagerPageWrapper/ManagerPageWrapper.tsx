import { Flex, Typography } from 'antd'
import React, { FC, ReactNode } from 'react'

const { Title } = Typography

export const ManagerPageWrapper: FC<{ title: string; children: ReactNode }> = ({ title, children }) => {
  return (
    <Flex vertical style={{ width: '100%' }} gap={36}>
      <Title level={1}>{title}</Title>
      {children}
    </Flex>
  )
}
