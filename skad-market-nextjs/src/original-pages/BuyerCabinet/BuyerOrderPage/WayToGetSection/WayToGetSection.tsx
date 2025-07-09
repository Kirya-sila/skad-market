import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import css from '../BuyerOrderPage.module.scss'
import { SectionCardWrapper } from '../SectionCardWrapper'
import { BuyerCabinetOrderItems } from './BuyerCabinetOrderItems'
import { buyerCabinetStore } from '@/features/buyer'
import { DeliveryDateSection, OrderDeliveryWay } from '@/shared/ui'
import { primaryWhite } from '@/theme'

// interface IWayToGetSection {}

// const orderDeliveryData = {
//   cityName: 'Сходня',
//   completeAddressTitle: 'Сходня, ул Мичурина, 17',
//   deliveryPointId: '838dad7e-dfe0-4d95-ab35-1a0c9350311a',
//   estimatedDeliveryDate: new Date(),
//   isParcelShop: true,
//   parcelShopWorkingDaysSchedule: 'Пн-Вс: 10:00 - 21:00',
//   totalDeliveryCost: null,
//   isExtractionSucceded: false,
//   workingTime: '',
// }

export const WayToGetSection = observer(() => {
  const { currentOrder } = buyerCabinetStore
  const {
    cityName,
    completeAddressTitle,
    deliveryPointId,
    estimatedDeliveryDate,
    isParcelShop,
    parcelShopWorkingDaysSchedule,
    totalDeliveryCost,
  } = currentOrder
  const orderDeliveryData = {
    cityName,
    completeAddressTitle,
    deliveryPointId,
    estimatedDeliveryDate,
    isParcelShop,
    parcelShopWorkingDaysSchedule,
    totalDeliveryCost,
    isExtractionSucceded: false,
    workingTime: '',
  }
  return (
    <SectionCardWrapper>
      <Flex vertical gap={24} style={{ width: '100%' }}>
        <span className={css.sectionTitle}>Способ получения</span>
        <Flex vertical gap={16}>
          <OrderDeliveryWay orderDeliveryData={orderDeliveryData} index={0} />
          {orderDeliveryData?.estimatedDeliveryDate && (
            <DeliveryDateSection date={orderDeliveryData.estimatedDeliveryDate} bgColor={primaryWhite} />
          )}
          <BuyerCabinetOrderItems />
        </Flex>
      </Flex>
    </SectionCardWrapper>
  )
})
