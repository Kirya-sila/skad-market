import { useEffect } from 'react'
import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { PageWrapper } from '../components'
import { Cards } from './Cards'
import { NotificationsSection } from './NotificationsSection'
import { buyerCabinetStore } from '@/features/buyer'
import { useWindowSize } from '@/shared/libs'
import { Spinner } from '@/shared/ui/Spinner'

// interface IBuyerMainPage {}

export const BuyerMainPage = observer(() => {
  const { width } = useWindowSize()
  const isTablet = width < 1024
  const isLaptop = width < 1440

  const { gethNotifications, getOrders, /* getProfileInfo, */ notificationsLoading, ordersLoading } = buyerCabinetStore

  useEffect(() => {
    // getProfileInfo()
    gethNotifications({ page: 1, pageSize: 3 })
    getOrders({ page: 1, pageSize: 3 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (notificationsLoading || ordersLoading) {
    return <Spinner />
  }

  return (
    <PageWrapper styles={{ marginTop: isTablet ? 16 : 'inherit' }} title={isTablet ? 'Личный кабинет' : 'Главная'}>
      <Flex gap={isLaptop ? 40 : 80}>
        <Cards />
        {!isTablet && <NotificationsSection />}
      </Flex>
    </PageWrapper>
  )
})
