'use client'

import { useEffect } from 'react'
import { Col, Flex, Row, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { FaqSection, HandleOrderButtons, PaymentStatus } from '../components'
import { getOrderStatus } from '../helpers'
import { BuyerInfoSection } from './BuyerInfoContainer'
import { CopyOrder } from './CopyOrder'
import { SummaryCard } from './SummaryCard'
import { WayToGetSection } from './WayToGetSection'
import { appRoutes } from '@/app-settings'
import { BackArrow } from '@/assets/icons'
import { buyerCabinetStore } from '@/features/buyer'
import { MainLayout } from '@/layouts'
import { useWindowSize } from '@/shared/libs'
import { ButtonBack } from '@/shared/ui'

// interface IBuyerOrderPage {}

const { Title } = Typography

interface BuyerOrderPageProps {
  orderId: string
}

export const BuyerOrderPage = observer(({ orderId }: BuyerOrderPageProps) => {
  const router = useRouter()
  const { width } = useWindowSize()
  const isTablet = width < 1024
  // const { isTablet, isMobile } = useWindowState()
  const { currentOrder, getOrder } = buyerCabinetStore

  useEffect(() => {
    if (orderId) {
      getOrder(orderId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId])

  const orderTitle = (value: string) => {
    return (
      <Title level={2} style={{ fontSize: isTablet ? 18 : 32, marginTop: 0 }}>
        {value}
      </Title>
    )
  }

  return (
    <MainLayout>
      <Flex vertical style={{ marginTop: 24 }} align='flex-start'>
        {!isTablet && <ButtonBack to={appRoutes.buyer.orders.root}>Все заказы</ButtonBack>}

        <Flex vertical style={{ marginBottom: 36, width: '100%' }} gap={isTablet ? 18 : 4}>
          <Flex
            align='center'
            style={{ display: 'inline-flex', marginTop: 16 }}
            justify={isTablet ? 'space-between' : 'flex-start'}
            gap={8}
          >
            {isTablet && (
              <Flex onClick={() => router.push(appRoutes.buyer.orders.root)} style={{ cursor: 'pointer' }}>
                <BackArrow />
              </Flex>
            )}
            <Flex align='center' gap={8}>
              {orderTitle(`Заказ № ${currentOrder.internalNumber}`)}
              {!isTablet && <CopyOrder />}
              {orderTitle(`от ${moment(currentOrder.createdAt).format('DD.MM.YYYY')}`)}
            </Flex>
            {isTablet && <CopyOrder />}
          </Flex>
          <Flex gap={12} justify={isTablet ? 'space-between' : 'flex-start'}>
            {getOrderStatus(currentOrder.status)}
            <PaymentStatus paymentStatus='При получении' />
            {/* {currentOrder.paymentMethod && <PaymentStatus paymentStatus={currentOrder.paymentMethod} />} */}
          </Flex>
        </Flex>

        <Row /* justify='space-between' gap={46} style={{ width: '100%' }} */ gutter={[{ xl: 64, md: 32 }, 24]}>
          <Col span={24} xxl={16} xl={16} lg={16} /* vertical gap={24} style={{ width: '100%', maxWidth: 760 }} */>
            <Flex vertical gap={24}>
              <BuyerInfoSection />
              <WayToGetSection />
              {!isTablet && <HandleOrderButtons showPayButton={false} currentOrder={currentOrder} />}
            </Flex>
          </Col>
          <Col span={24} xxl={8} xl={8} lg={8} /* vertical gap={36} style={{ width: '100%', maxWidth: 424 }} */>
            <Flex vertical gap={24}>
              <SummaryCard />
              {isTablet && <HandleOrderButtons showPayButton={false} currentOrder={currentOrder} />}
              <FaqSection />
            </Flex>
          </Col>
        </Row>
      </Flex>
    </MainLayout>
  )
})
