import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { OrderItems } from '../OrderItems'
import { DeliveryWay } from './DeliveryWay'
import css from './WayToGetInfo.module.scss'
import { orderStore } from '@/features/order/model/orderStore'
import { IOrderDeliveryData } from '@/interfaces'
import { DeliveryDateSection, FlexColumn } from '@/shared/ui'
import { primaryLightestGray } from '@/theme'

export const WayToGetInfo: FC<{ orderDeliveryData: IOrderDeliveryData }> = observer(({ orderDeliveryData }) => {
  const { orderItems } = orderStore
  return (
    <FlexColumn classname={css.wayToGetInfo}>
      {/* {orderDeliveryGroups.map((groupItem, i) => ( */}
      <FlexColumn classname={css.deliveryPoint}>
        <>
          <DeliveryWay index={0} orderDeliveryData={orderDeliveryData} />
          {orderDeliveryData?.estimatedDeliveryDate && (
            <DeliveryDateSection date={orderDeliveryData.estimatedDeliveryDate} bgColor={primaryLightestGray} />
          )}
        </>
        <OrderItems orderItems={orderItems} />
        {/* {!!(orderDeliveryGroups.length - 1 !== i || deliveryUnavailableItems.length) && (
            <Divider className={css.divider} />
          )} */}
      </FlexColumn>
      {/* ))} */}
      {/* <NotSupportedDeliveryWay /> */}
    </FlexColumn>
  )
})
