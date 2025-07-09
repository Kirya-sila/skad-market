import { Col, Flex, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import { Card } from '../../components'
import { BuyerInfoCard } from './BuyerInfoCard/BuyerInfoCard'
import { LastOrderCard } from './OrdersCard'
import { appRoutes } from '@/app-settings'
// import { ComparisonEmptyIcon, ComparisonFilledIcon, HeartEmptyIcon, HeartRedIcon } from '@/assets/icons'
import { useNavigateWithScrollUp, useWindowSize } from '@/shared/libs'

// interface ICards {}

export const Cards = observer(() => {
  const navigate = useNavigateWithScrollUp()
  const { width } = useWindowSize()
  const isTablet = width < 1024

  return (
    <Flex style={{ flexBasis: isTablet ? '100%' : '65%' }}>
      <Row gutter={[24, 24]} style={{ alignContent: 'flex-start', width: '100%' }}>
        {isTablet && (
          <Col span={24}>
            <Flex onClick={() => navigate(appRoutes.buyer.profile)}>
              <BuyerInfoCard />
            </Flex>
          </Col>
        )}
        <Col span={24}>
          {isTablet ? (
            <Flex onClick={() => navigate(appRoutes.buyer.orders.root)} style={{ cursor: 'pointer' }}>
              <Card title='Заказы' />
            </Flex>
          ) : (
            <LastOrderCard />
          )}
        </Col>
        {/* <Col span={12}>
          <Card title='Избранное' titleRightContent={false ? <HeartRedIcon /> : <HeartEmptyIcon />}>
            Нет товаров
          </Card>
        </Col>
        <Col span={12}>
          <Card title='Сравнение' titleRightContent={false ? <ComparisonFilledIcon /> : <ComparisonEmptyIcon />}>
            Нет товаров
          </Card>
        </Col> */}
        <Col span={24}>
          {isTablet && (
            <Flex onClick={() => navigate(appRoutes.buyer.notifications)} style={{ cursor: 'pointer' }}>
              <Card title='Уведомления' />
            </Flex>
          )}
        </Col>
      </Row>
    </Flex>
  )
})
