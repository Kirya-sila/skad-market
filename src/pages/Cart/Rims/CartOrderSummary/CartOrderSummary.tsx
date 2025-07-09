import { FC, useMemo } from 'react'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import css from './CartOrderSummary.module.scss'
import { buyerAccessToken } from '@/constants'
import { authorizationStore } from '@/features/authorization'
import { cartStore } from '@/features/cart'
import { orderStore } from '@/features/order/model/orderStore'
import { Divider, FlexColumn, FlexRow, TextInput } from '@/shared/ui'

interface ICartOrderSummary {
  rebate?: number
}

export const CartOrderSummary: FC<ICartOrderSummary> = observer(({ rebate = 0 }) => {
  const { summToPay, totalCheckedItems, checkedItems } = cartStore
  const { handleOpenAuthorizationModal } = authorizationStore
  const { initOrder, isLoading } = orderStore

  const isSomethingChecked = useMemo(() => !!checkedItems.length, [checkedItems.length])

  const handleOrderInit = () => {
    if (!localStorage.getItem(buyerAccessToken)) {
      handleOpenAuthorizationModal(true)
    } else {
      initOrder(checkedItems)
    }
  }

  return (
    <FlexColumn classname={css.container}>
      <FlexRow classname={css.title}>Ваш заказ</FlexRow>
      <FlexRow classname={css.costRow}>
        <span className={css.label}>
          <span style={{ marginRight: '4px' }}>{totalCheckedItems}</span>
          <span>товаров</span>
        </span>
        {isSomethingChecked && (
          <span className={css.cost} style={{ whiteSpace: 'nowrap' }}>
            {summToPay.toLocaleString()} ₽
          </span>
        )}
      </FlexRow>
      {isSomethingChecked && (
        <>
          <FlexRow classname={css.costRow}>
            <span className={css.label}>Скидка</span>
            <span className={css.rebate} style={{ whiteSpace: 'nowrap' }}>
              {rebate.toLocaleString()} ₽
            </span>
          </FlexRow>

          <FlexColumn classname={css.promocode}>
            <span>Введите промокод, если он у вас есть</span>
            <TextInput
              type='text'
              onChange={(e) => console.log('Промокод: ', e.target.value)}
              value=''
              placeholder='Промокод'
              inputClassName={css.promoInput}
            />
          </FlexColumn>
          <Divider className={css.divider} />
          <FlexRow classname={css.costRow}>
            <span>
              <span style={{ fontWeight: 600 }}>Итого к оплате</span>
            </span>
            <span className={css.orderSumm} style={{ whiteSpace: 'nowrap' }}>
              {summToPay.toLocaleString()} ₽
            </span>
          </FlexRow>
        </>
      )}
      <Button
        disabled={!isSomethingChecked || isLoading}
        className={css.button}
        size='large'
        type='primary'
        onClick={handleOrderInit}
        loading={isLoading}
      >
        Перейти к оформлению
      </Button>
      {isSomethingChecked && (
        <FlexRow classname={css.comment}>Дата и стоимость доставки определяются при оформлении заказа</FlexRow>
      )}
    </FlexColumn>
  )
})
