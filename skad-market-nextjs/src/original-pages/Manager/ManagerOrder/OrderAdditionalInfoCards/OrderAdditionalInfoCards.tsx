import { Flex } from 'antd'
import { AdditionalInfoCard } from './AdditionalInfoCard'
import { BuyerCard } from './BuyerCard'
import { CommentsCard } from './CommentsCard'
import { OrderStatusCard } from './OrderStatusCard'
import { PaymentsCard } from './PaymentsCard'
import { SummaryInfoCard } from './SummaryInfoCard'

export const OrderAdditionalInfoCards = () => {
  return (
    <Flex vertical gap={24} style={{ marginBottom: 32 }}>
      <AdditionalInfoCard title='Покупатель' mainContent={<BuyerCard />} />
      <AdditionalInfoCard title='Оплата' mainContent={<PaymentsCard />} />
      <AdditionalInfoCard title='Комментарий' mainContent={<CommentsCard />} />
      <AdditionalInfoCard title='Служебный статус' mainContent={<OrderStatusCard />} />
      <AdditionalInfoCard title='Итоговая информация' mainContent={<SummaryInfoCard />} />
    </Flex>
  )
}
