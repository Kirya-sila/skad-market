import { Col, Flex, Row } from 'antd'
import { DeliveryAddressCard } from './DeliveryAddressCard'
import { PersonalInformationCard } from './PersonalInformationCard'
import { authorizationStore } from '@/features/authorization'
import { useBuyerLogout, useWindowSize } from '@/shared/libs'
import { DangerTextButton } from '@/shared/ui'

// interface ICards {}

export const Cards = () => {
  const { width } = useWindowSize()
  const logoutBuyer = useBuyerLogout()
  const { isLoggingOut } = authorizationStore

  const logout = () => {
    logoutBuyer()
  }

  return (
    <Flex vertical style={{ flexBasis: '65%' }} gap={16}>
      <Row gutter={[24, 24]} style={{ alignContent: 'flex-start' }}>
        <Col span={24}>
          <PersonalInformationCard />
        </Col>
        <Col span={24}>
          <DeliveryAddressCard />
        </Col>
      </Row>
      <Flex style={{ width: '100%' }} justify={width < 1024 ? 'center' : 'flex-start'}>
        <DangerTextButton onClick={logout} loading={isLoggingOut}>
          Выйти из аккаунта
        </DangerTextButton>
      </Flex>
    </Flex>
  )
}
