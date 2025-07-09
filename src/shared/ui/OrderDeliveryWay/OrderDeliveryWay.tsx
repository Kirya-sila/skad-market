import { FC } from 'react'
import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import css from './OrderDeliveryWay.module.scss'
import { Modals } from '@/app/config/modal/modals-confg'
import { DeliveryPointIcon1, ICQuestionMarkBubble } from '@/assets/icons'
import { DeliveryPointIcon2 } from '@/assets/icons/DeliveryPointIcon2'
import { IDeliveryPointWorkingOptionsModal, IOrderDeliveryData } from '@/interfaces'
import { useModal } from '@/shared/libs'

interface IOrderDeliveryWay {
  orderDeliveryData: IOrderDeliveryData
  index: number
}

export const OrderDeliveryWay: FC<IOrderDeliveryWay> = observer(({ orderDeliveryData, index }) => {
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
    <Flex gap={8} align='center'>
      <div>{index + 1 === 1 ? <DeliveryPointIcon1 /> : <DeliveryPointIcon2 />}</div>
      <Flex vertical className={css.titleContainer}>
        <span>{orderDeliveryData.isParcelShop ? 'Пункт выдачи DPD' : 'Курьерская доставка'}</span>
        <Flex gap={8} className={css.addressContainer}>
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
