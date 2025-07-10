'use client'

import { useState } from 'react'
import { Button, Flex, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { PageWrapperWithBackButton } from '@/components/buyer/PageWrapperWithBackButton'
import { FaqSection } from '@/components/buyer/FaqSection'
import { BuyerOrderCard } from '@/components/buyer/OrderCard/BuyerOrderCard'
import { EmptyOrdersPage } from '@/components/buyer/EmptyOrdersPage'
import { OrderCardWrapper } from '@/components/buyer/OrderCardWrapper'
import { appRoutes } from '@/app-settings'
import { ArrowDownIcon } from '@/assets/icons/ArrowDownIcon'
import { useWindowSize } from '@/shared/libs'
import { Spinner } from '@/shared/ui/Spinner'
import { primaryDarkGray, primaryDarkestGray } from '@/theme'
import { useBuyerOrders } from '@/lib/queries'

const { Title } = Typography

const BuyerOrdersPage = observer(() => {
  const router = useRouter()
  const { width } = useWindowSize()
  const isTablet = width < 1024
  const [openAll, setOpenAll] = useState(false)

  const { data, isLoading } = useBuyerOrders()
  const orders = (data as any[]) || []

  const handleOrder = (orderId: string) => {
    router.push(appRoutes.buyer.orders.orderItem.replace('[orderId]', orderId))
  }

  if (isLoading) {
    return <Spinner />
  }

  if (!orders.length) {
    return <EmptyOrdersPage />
  }

  return (
    <PageWrapperWithBackButton>
      <Flex vertical gap={24} style={{ width: '100%' }}>
        <Flex align='flex-end'>
          <Title style={{ marginTop: 0, color: primaryDarkGray, fontSize: '32px', lineHeight: '42px' }}>Заказы</Title>
          <Button
            type='link'
            style={{ color: primaryDarkestGray }}
            icon={
              <Flex style={{ transform: openAll ? 'rotate(-90deg)' : 'rotate(0)' }}>
                <ArrowDownIcon />
              </Flex>
            }
            iconPosition='end'
            onClick={() => setOpenAll(!openAll)}
          >
            Все
          </Button>
        </Flex>
        <Flex
          justify='space-between'
          gap={isTablet ? 40 : 0}
          style={{ width: '100%', flexDirection: isTablet ? 'column' : 'row' }}
        >
          <Flex vertical gap={16} flex={1} style={{ maxWidth: '704px' }}>
            {orders.map(
              (item: any, i: number) =>
                (openAll || (!openAll && i < 3)) && (
                  <OrderCardWrapper key={item.id} onClick={() => handleOrder(item.id)}>
                    <BuyerOrderCard currentOrder={item} />
                  </OrderCardWrapper>
                ),
            )}
          </Flex>
          <FaqSection />
        </Flex>
      </Flex>
    </PageWrapperWithBackButton>
  )
})

export default BuyerOrdersPage