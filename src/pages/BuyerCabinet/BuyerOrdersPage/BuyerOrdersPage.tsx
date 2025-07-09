import { useEffect, useState } from 'react'
import { Button, Flex, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { generatePath } from 'react-router-dom'
import { PageWrapperWithBackButton } from '../PageWrapperWithBackButton'
import { FaqSection } from '../components'
import { BuyerOrderCard } from '../components/OrderCard/BuyerOrderCard'
import { EmptyOrdersPage } from './EmptyOrdersPage'
import { OrderCardWrapper } from './OrderCardWrapper'
import { appRoutes } from '@/app-settings'
import { ArrowDownIcon } from '@/assets/icons/ArrowDownIcon'
import { buyerCabinetStore } from '@/features/buyer'
import { useNavigateWithScrollUp, useWindowSize } from '@/shared/libs'
import { Spinner } from '@/shared/ui/Spinner'
import { primaryDarkGray, primaryDarkestGray } from '@/theme'

// interface IBuyerOrdersPage {}
const { Title } = Typography

export const BuyerOrdersPage = observer(() => {
  const navigate = useNavigateWithScrollUp()
  const { width } = useWindowSize()
  const isTablet = width < 1024
  const [openAll, setOpenAll] = useState(false)

  const { orders, getOrders, ordersLoading } = buyerCabinetStore

  const handleOrder = async (orderId: string) => {
    navigate(generatePath(appRoutes.buyer.orders.orderItem, { orderId }))
  }

  useEffect(() => {
    getOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (ordersLoading) {
    return <Spinner />
  }

  if (!orders?.length) {
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
              (item, i) =>
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
