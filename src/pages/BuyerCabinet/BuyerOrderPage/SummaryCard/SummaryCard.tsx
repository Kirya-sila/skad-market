import { Flex, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { SectionCardWrapper } from '../SectionCardWrapper'
import { SummaryCardRow } from './SummaryCardRow'
import { buyerCabinetStore } from '@/features/buyer'
import { Divider, SectionTitle } from '@/shared/ui'
import { primaryRed } from '@/theme'


const { Title } = Typography

export const SummaryCard = observer(() => {
  const { currentOrder } = buyerCabinetStore
  const { totalOrderCost, totalDeliveryCost, promocodeDiscount, discount, promocode } = currentOrder

  const totalPrice = (totalOrderCost || 0) + (totalDeliveryCost || 0) - (discount || 0) - (promocodeDiscount || 0)
  return (
    <SectionCardWrapper padding='20px'>
      <Flex vertical gap={12} style={{ width: '100%' }}>
        <SummaryCardRow title='Общая стоимость заказа' summ={totalOrderCost} />
        <SummaryCardRow title='Сумма скидки' summ={discount} summColor={primaryRed} />
        {promocode && (
          <SummaryCardRow
            title={`Промокод ${promocode}`}
            summ={promocodeDiscount}
            summColor={primaryRed}
          />
        )}
        <SummaryCardRow title='Стоимость доставки' summ={totalDeliveryCost} />
        <Divider />
        <Flex align='flex-end' justify='space-between'>
          <SectionTitle style={{ lineHeight: '20px' }}>Итого</SectionTitle>
          <Title level={2} style={{ fontSize: 30, lineHeight: '36px', fontWeight: 700 }}>
            {totalPrice?.toLocaleString()} ₽
          </Title>
        </Flex>
      </Flex>
    </SectionCardWrapper>
  )
})
