import { useEffect } from 'react'
import { Col, Flex, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import { NotificationsSection } from '../BuyerMainPage/NotificationsSection'
import { PageWrapperWithBackButton } from '../PageWrapperWithBackButton'
import { PageWrapper } from '../components'
import { Cards } from './Cards'
import { buyerCabinetStore } from '@/features/buyer'
import { useWindowSize } from '@/shared/libs'

// interface IProfilePage {}

export const ProfilePage = observer(() => {
  const { width } = useWindowSize()

  const { getProfileInfo, gethNotifications } = buyerCabinetStore

  useEffect(() => {
    getProfileInfo()
    gethNotifications({ page: 1, pageSize: 3 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageWrapperWithBackButton>
      <PageWrapper title='Профиль'>
        <Flex vertical gap={16}>
          <Row gutter={[{ xl: 64, md: 32 }, 24]}>
            <Col span={24} lg={16}>
              <Cards />
            </Col>
            {width >= 1024 && (
              <Col span={24} lg={8}>
                <NotificationsSection />
              </Col>
            )}
          </Row>
        </Flex>
      </PageWrapper>
    </PageWrapperWithBackButton>
  )
})
