import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import css from './Cart.module.scss'
import { CartOrderSummary, ItemCards } from './Rims'
import { SelectAll } from './SelectAll'
import { Title } from './Title'
import { cartStore } from '@/features/cart'
import { FlexColumn, FlexRow } from '@/shared/ui'

export const Cart = observer(() => {
  const { rimsData, tyresData } = cartStore

  return (
    <Flex vertical style={{ marginTop: 56, width: '100%' }} gap={36}>
      <Title />

      <FlexRow classname={css.cartWithOrderContainer}>
        <FlexColumn classname={css.mainContent}>
          <SelectAll />

          <ItemCards title='Диски' data={rimsData} />
          <ItemCards title='Шины' data={tyresData} />
        </FlexColumn>

        <CartOrderSummary />
      </FlexRow>
    </Flex>
  )
})
