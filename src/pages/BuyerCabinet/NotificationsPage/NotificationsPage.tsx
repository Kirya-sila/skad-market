import { useEffect, useMemo } from 'react'
import { Button, Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { PageWrapperWithBackButton } from '../PageWrapperWithBackButton'
import { PageWrapper } from '../components'
import { Notification } from './Notification'
import { SettingsWheelIcon } from '@/assets/icons'
import { buyerCabinetStore } from '@/features/buyer'
import { useWindowSize } from '@/shared/libs'
import { NotificationsSetupModal, Pagination } from '@/shared/ui'

// interface INotificationsPage {}

export const NotificationsPage = observer(() => {
  const { width } = useWindowSize()
  const { showNotesSetupModal, openNotesSetupModal, gethNotifications } = buyerCabinetStore
  const isTablet = useMemo(() => width < 1024, [width])
  const isMobile = useMemo(() => width < 600, [width])

  const { buyerNotifications: buyerNotifs } = buyerCabinetStore

  useEffect(() => {
    gethNotifications({ page: 1, pageSize: 20 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleShowNotesSetupModal = () => {
    showNotesSetupModal(true)
  }

  return (
    <PageWrapperWithBackButton>
      <PageWrapper
        width={isTablet ? '100%' : '80%'}
        title='Уведомления'
        button={
          <Button type='link' icon={<SettingsWheelIcon />} onClick={handleShowNotesSetupModal}>
            Настроить уведомления
          </Button>
        }
      >
        <Flex vertical gap={16} style={{ width: isTablet ? '100%' : '80%' }}>
          <Flex vertical gap={16}>
            {buyerNotifs.map(({ id, createdAt, notificationText, orderDate, orderNo }) => (
              <Notification
                key={id + createdAt}
                id={id}
                createdAt={createdAt}
                notificationText={notificationText}
                orderDate={orderDate}
                orderNo={orderNo}
              />
            ))}
          </Flex>
          <Flex
            style={
              isMobile
                ? { flexDirection: 'column-reverse', alignItems: 'center', gap: 16 }
                : { justifyContent: 'space-between' }
            }
          >
            <Flex style={{ width: 'auto' }}>
              <Pagination
                // className={css.pagination}
                currentPage={1}
                onChange={() => console.log('Handle change')}
                total={5}
              />
            </Flex>
            {/* <Button style={{ width: isMobile ? '100%' : 'auto' }}>Показать еще</Button> */}
          </Flex>
        </Flex>
      </PageWrapper>
      {openNotesSetupModal && <NotificationsSetupModal />}
    </PageWrapperWithBackButton>
  )
})
