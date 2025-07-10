'use client'

import { Col, Flex, Row, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { SideMenu } from './SideMenu'
import { buyerCabinetStore } from '@/features/buyer'
import { MainLayout } from '@/layouts'
import { useWindowSize } from '@/shared/libs'
import { primaryDarkestGray } from '@/theme'

const { Title, Paragraph } = Typography

export const BuyerCabinet = observer(() => {
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
        {/* <Flex> */}
        <Row gutter={[{ xxl: 80, sm: 20 }, 0]}>
          {width > 1023 && (
            <Col span={4}>
              <SideMenu />
            </Col>
          )}
          <Col span={width > 1023 ? 20 : 24}>
            {/* Content will be rendered by Next.js routing */}
          </Col>
        </Row>
        {/* </Flex> */}
      </Flex>
    </MainLayout>
  )
})
