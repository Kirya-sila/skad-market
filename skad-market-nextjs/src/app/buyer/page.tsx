'use client'

import React from 'react'
import { Col, Flex, Row, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { SideMenu } from '@/original-pages/BuyerCabinet/SideMenu'
import { buyerCabinetStore } from '@/features/buyer'
import { MainLayout } from '@/layouts'
import { useWindowSize } from '@/shared/libs'
import { primaryDarkestGray } from '@/theme'

const { Title, Paragraph } = Typography

const BuyerCabinet = observer(() => {
  const { width } = useWindowSize()
  const isTablet = width < 1024
  const { userFullName } = buyerCabinetStore

  return (
    <MainLayout>
      <Flex vertical gap={36}>
        {!isTablet && (
          <Flex vertical gap={8}>
            <Title level={1}>Личный кабинет</Title>
            <Paragraph style={{ fontSize: 16 }} color={primaryDarkestGray}>
              {userFullName}
            </Paragraph>
          </Flex>
        )}
        <Row gutter={[{ xxl: 80, sm: 20 }, 0]}>
          {width > 1023 && (
            <Col span={4}>
              <SideMenu />
            </Col>
          )}
          <Col span={width > 1023 ? 20 : 24}>
            {/* Buyer Cabinet content will be rendered here */}
            <div>Buyer Cabinet Content</div>
          </Col>
        </Row>
      </Flex>
    </MainLayout>
  )
})

export default BuyerCabinet