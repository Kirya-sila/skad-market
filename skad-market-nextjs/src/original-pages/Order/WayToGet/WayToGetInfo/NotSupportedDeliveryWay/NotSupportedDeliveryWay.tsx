import { observer } from 'mobx-react-lite'
import { OrderItems } from '../../OrderItems'
import css from './NotSupportedDeliveryWay.module.scss'
import { orderStore } from '@/features/order/model/orderStore'
import { FlexColumn, FlexRow, RegularButton } from '@/shared/ui'

//TODO: we need items to provide it to yandex cards modal
export const NotSupportedDeliveryWay = observer(() => {
  const { orderItems } = orderStore

  // if (!deliveryUnavailableItems.length) {
  //   return null
  // }

  return (
    <FlexColumn>
      <FlexRow classname={css.container}>
        <FlexColumn classname={css.info}>
          <span>Для 1 товара выберите другой способ доставки</span>
          <span>Не сможем доставить в выбранный пункт выдачи.</span>
        </FlexColumn>
        <RegularButton variant='text' text='Выбрать другой' onClick={() => console.log()} />
      </FlexRow>
      <OrderItems orderItems={orderItems} />
    </FlexColumn>
  )
})
