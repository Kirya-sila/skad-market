'use client'

import React from 'react'
import { Flex, Typography } from 'antd'
import { ManagerPageWrapper } from '@/original-pages/Manager/ManagerPageWrapper/ManagerPageWrapper'

const { Title } = Typography

export default function ManagerPage() {
  return (
    <ManagerPageWrapper title="Manager Dashboard">
      <Flex vertical gap={20}>
        <Title level={3}>Manager Dashboard</Title>
        <p>Manager functionality will be implemented here</p>
      </Flex>
    </ManagerPageWrapper>
  )
}