import { Flex, Typography } from 'antd'
import { CatalogButtons, FaqSection } from '../components'
import { NoOrdersIcon } from '@/assets/icons'

const { Title, Text } = Typography

export const EmptyOrdersPage = () => {
  return (
    <Flex justify='space-between' style={{ width: '100%' }}>
      <Flex vertical align='center' gap={24}>
        <Title style={{ marginTop: 0 }}>У вас нет заказов</Title>
        <NoOrdersIcon />
        <Text style={{ fontSize: 18 }}>Вы не оформили ни одного заказа. Ваша машина очень ждет новые колеса</Text>
        <CatalogButtons />
      </Flex>
      <FaqSection />
    </Flex>
  )
}
