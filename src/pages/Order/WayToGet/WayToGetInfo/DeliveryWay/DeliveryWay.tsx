import { FC } from 'react'
import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import css from './DeliveryWay.module.scss'
import { Modals } from '@/app/config/modal/modals-confg'
import { DeliveryPointIcon1, ICQuestionMarkBubble } from '@/assets/icons'
import { DeliveryPointIcon2 } from '@/assets/icons/DeliveryPointIcon2'
import { deliveryItemsStore } from '@/features'
import { orderStore } from '@/features/order/model/orderStore'
import { IDeliveryPointWorkingOptionsModal, IOrderDeliveryData } from '@/interfaces'
import { useModal } from '@/shared/libs'
import { RegularButton } from '@/shared/ui'

interface IDeliveryPoint {
  orderDeliveryData: IOrderDeliveryData
  index: number
}

export const DeliveryWay: FC<IDeliveryPoint> = observer(({ orderDeliveryData, index }) => {
  const { openMapModal, openPreferedDeliveryItemsModal } = orderStore
  const { userDeliveryItems } = deliveryItemsStore
  const deliveryPointInfoModal = useModal<IDeliveryPointWorkingOptionsModal>(Modals.DeliveryPointWorkingOptionsModal)

  const showDeliveryPointInfo = () => {
    deliveryPointInfoModal.open({
      onClose: deliveryPointInfoModal.close,
      deliveryOptions: {
        totalDeliveryCost: orderDeliveryData.totalDeliveryCost,
        workingTime: orderDeliveryData.parcelShopWorkingDaysSchedule,
        estimatedDeliveryDate: orderDeliveryData.estimatedDeliveryDate,
        completeAddressTitle: orderDeliveryData.completeAddressTitle,
      },
    })
  }

  return (
    <Flex className={css.container}>
      <div>{index + 1 === 1 ? <DeliveryPointIcon1 /> : <DeliveryPointIcon2 />}</div>
      <Flex vertical className={css.titleContainer}>
        <Flex align='center' justify='space-between'>
          <span>{orderDeliveryData.isParcelShop ? 'Пункт выдачи DPD' : 'Курьерская доставка'}</span>
          <RegularButton
            variant='text'
            text='Изменить'
            onClick={userDeliveryItems.length ? openPreferedDeliveryItemsModal : openMapModal}
          />
        </Flex>
        <Flex className={css.addressContainer}>
          <>
            {orderDeliveryData.totalDeliveryCost ? (
              <span className={css.deliveryCost}>
                Доставка {orderDeliveryData.totalDeliveryCost.toLocaleString()} ₽
              </span>
            ) : (
              <span className={css.freeDelivery}>Бесплатная доставка</span>
            )}
          </>
          <span className={css.address}>
            {orderDeliveryData.completeAddressTitle}
            <span className={css.questionMark} onClick={showDeliveryPointInfo}>
              <ICQuestionMarkBubble />
            </span>
          </span>
        </Flex>
      </Flex>
    </Flex>
  )
})
