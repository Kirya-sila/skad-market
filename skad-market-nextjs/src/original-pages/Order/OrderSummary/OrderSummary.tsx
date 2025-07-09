import { useEffect, useMemo } from 'react'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import css from './OrderSummary.module.scss'
import { orderStore } from '@/features/order/model/orderStore'
import { getOrederPaymentWay } from '@/helpers'
import { Divider, Flex, FlexColumn, FlexRow, TextInput } from '@/shared/ui'

export const OrderSummary = observer(() => {
  const { id } = useParams()

  const {
    orderItems,
    hasAllSectionsEmpty,
    totalOrderCost,
    totalItemsAmount,
    totalItemsWeight,
    isLoading,
    isSubmitOrderLoading,
    submitOrder,
    wayToPay,
    handleTouchAllSections,
    hasDeliveryInfo,
    hasWayToPay,
    hasPersonBuyerInfo,
    isAllSectionsTouched,
  } = orderStore

  const isItems = useMemo(() => !!orderItems.length, [orderItems.length])

  useEffect(() => {
    if (isAllSectionsTouched && hasDeliveryInfo && hasWayToPay && hasPersonBuyerInfo) {
      submitOrder(id ?? '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isAllSectionsTouched, hasDeliveryInfo, hasWayToPay, hasPersonBuyerInfo])

  const handleSubmitOrder = () => {
    handleTouchAllSections()
  }

  return (
    <FlexColumn>
      <FlexColumn classname={css.container}>
        <FlexRow classname={css.title}>
          <span>Ваш заказ</span>
          {!!totalItemsAmount && !!totalItemsWeight && (
            <span>
              {totalItemsAmount} товаров {totalItemsWeight} кг
            </span>
          )}
        </FlexRow>
        <FlexRow classname={css.costRow}>
          <span className={css.label}>
            <span>Общая стоимость товаров</span>
          </span>
          {isItems && (
            <span className={css.cost} style={{ whiteSpace: 'nowrap' }}>
              {totalOrderCost.toLocaleString()} ₽
            </span>
          )}
        </FlexRow>
        {isItems && (
          <>
            <FlexRow classname={css.costRow}>
              <span className={css.label}>Сумма скидки</span>
              <span className={css.rebate} style={{ whiteSpace: 'nowrap' }}>
                {/* rebate.toLocaleString() */ 0} ₽
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
                <span>Способ оплаты:</span>
              </span>
              <span className={css.paymentWay} style={{ whiteSpace: 'nowrap' }}>
                {getOrederPaymentWay(wayToPay)}
              </span>
            </FlexRow>
            <FlexRow classname={css.costRow}>
              <span>
                <span style={{ fontWeight: 600 }}>Итого к оплате</span>
              </span>
              <span className={css.orderSumm} style={{ whiteSpace: 'nowrap' }}>
                {totalOrderCost.toLocaleString()} ₽
              </span>
            </FlexRow>
          </>
        )}
        <Button
          disabled={!isItems || isLoading || isSubmitOrderLoading}
          size='large'
          variant='filled'
          type='primary'
          onClick={handleSubmitOrder}
          loading={isSubmitOrderLoading}
        >
          Оформить заказ
        </Button>
        {isItems && (
          <FlexRow classname={css.comment}>
            Нажимая кнопку “Оформить заявку”, я принимаю условия Соглашения на обработку персональных данных и
            Договора-оферты
          </FlexRow>
        )}
      </FlexColumn>
      {hasAllSectionsEmpty && (
        <Flex>
          <ul className={css.errors}>
            <li>укажите данные покупателя</li>
            <li>выберите способ получения</li>
            <li>выберите способ оплаты</li>
          </ul>
        </Flex>
      )}
    </FlexColumn>
  )
})
