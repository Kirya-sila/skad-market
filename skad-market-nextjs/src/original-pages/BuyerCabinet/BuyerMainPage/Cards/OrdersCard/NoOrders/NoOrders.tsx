import { Flex, Typography } from 'antd'
import { CatalogButtons } from '@/pages'

const { Title, Text } = Typography

export const NoOrders = () => {
  return (
    <Flex vertical align='center'>
      <Title level={2} style={{ fontSize: 32, marginBottom: 16 }}>
        У вас нет заказов
      </Title>
      <Text style={{ fontSize: 18, marginBottom: 36, textAlign: 'center' }}>
        Вы не оформили ни одного заказа. Ваша машина очень ждет новые колеса
      </Text>
      <CatalogButtons />
    </Flex>
  )
}
