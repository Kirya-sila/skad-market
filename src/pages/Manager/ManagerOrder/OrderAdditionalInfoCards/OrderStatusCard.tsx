import { Flex } from 'antd'
import { InfoText } from '@/shared/ui'
import { observer } from 'mobx-react-lite'
import { managersOrderStore } from '@/features/manager'

// interface IOrderStatusCard {}

export const OrderStatusCard = observer(() => {
  const { servingStatus } = managersOrderStore
  return (
    <Flex vertical gap={10}>
      <InfoText>{servingStatus ?? ''}</InfoText>
    </Flex>
  )
})
