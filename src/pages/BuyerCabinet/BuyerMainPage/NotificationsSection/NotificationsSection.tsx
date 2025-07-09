import { Flex, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { NoNotifications } from './NoNotifications'
import { NofificationCard } from './NofificationCard'
import { appRoutes } from '@/app-settings'
import { buyerCabinetStore } from '@/features/buyer'
import { useWindowSize } from '@/shared/libs'
import { ButtonForward } from '@/shared/ui'
import { Spinner } from '@/shared/ui/Spinner'

const { Title } = Typography

export const NotificationsSection = observer(() => {
  const { width } = useWindowSize()
  const isLaptop = width < 1440

  const { buyerNotifications, notificationsLoading } = buyerCabinetStore

  if (notificationsLoading) {
    return <Spinner />
  }

  if (!buyerNotifications?.length) {
    return (
      <Flex style={{ flexBasis: '35%' }}>
        <NoNotifications />
      </Flex>
    )
  }

  return (
    <Flex vertical gap={24} style={{ flexBasis: '35%' }} align={isLaptop ? 'flex-start' : 'space-between'}>
      <Flex justify='space-between' align='center'>
        <Title level={5} style={{ marginTop: 0 }}>
          Уведомления
        </Title>
        {!isLaptop && <ButtonForward to={appRoutes.buyer.notifications}>Все уведомления</ButtonForward>}
      </Flex>
      <Flex vertical gap={16}>
        {buyerNotifications?.map(
          ({ id, orderNo, orderDate, createdAt, notificationText }, i) =>
            i < 3 && (
              <NofificationCard
                key={id + createdAt}
                id={id}
                orderNo={orderNo}
                orderDate={orderDate}
                createdAt={createdAt}
                notificationText={notificationText}
              />
            ),
        )}
      </Flex>
      {isLaptop && <ButtonForward to={appRoutes.buyer.notifications}>Все уведомления</ButtonForward>}
    </Flex>
  )
})
