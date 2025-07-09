import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { DeliveryType } from '@/constants'
import { orderStore } from '@/features/order/model/orderStore'
import { FlexRow, Tab } from '@/shared/ui'

interface ITabs {
  classname?: string
}

export const Tabs: FC<ITabs> = observer(({ classname }) => {
  const { setCurrentDeliveryTypeTab, currentDeliveryTypeTab/* , resetSearchInput */ } = orderStore
  const handleClick = (id: DeliveryType) => {
    setCurrentDeliveryTypeTab(id)
    // resetSearchInput()
  }

  return (
    <FlexRow classname={classname}>
      <Tab
        id={DeliveryType.PVZ}
        text='Пункт выдачи'
        checked={currentDeliveryTypeTab === DeliveryType.PVZ}
        handleClick={handleClick}
      />
      <Tab
        id={DeliveryType.Courier}
        text='Курьерская доставка'
        checked={currentDeliveryTypeTab === DeliveryType.Courier}
        handleClick={handleClick}
      />
    </FlexRow>
  )
})
