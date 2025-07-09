import { Flex, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { ChangeNumberTooltip } from './ChangeNumberTooltip'
import { buyerCabinetStore } from '@/features/buyer'
import { InfoTitle } from '@/shared/ui'

// interface IPhoneSection {}

const { Text } = Typography

export const PhoneSection = observer(() => {
  const { buyerPhone } = buyerCabinetStore
  return (
    <Flex vertical>
      <InfoTitle>Телефон</InfoTitle>
      <Flex align='center' gap={4}>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>{buyerPhone}</Text>
        <ChangeNumberTooltip />
      </Flex>
    </Flex>
  )
})
