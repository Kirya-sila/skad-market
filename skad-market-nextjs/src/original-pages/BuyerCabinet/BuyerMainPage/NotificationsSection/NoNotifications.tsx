import { Button, Flex, Typography } from 'antd'
import { NotificationMarkIcon } from '@/assets/icons'

const { Text, Title } = Typography

export const NoNotifications = () => {
  return (
    <Flex vertical align='flex-start'>
      <NotificationMarkIcon />
      <Title level={2} style={{ marginTop: 16, fontSize: 32 }}>
        У вас пока <br/> нет уведомлений
      </Title>
      <Text style={{ marginTop: 16 }}>
        После оформления заказа, здесь будут отображаться сообщения от транспортной компании
      </Text>
      <Button style={{ scrollMarginTop: 24, padding: 0 }} type='link'>
        Настройка уведомлений
      </Button>
    </Flex>
  )
}
