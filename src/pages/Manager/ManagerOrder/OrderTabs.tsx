import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { OrderTabsTypes } from '@/constants'
import { managersOrderStore } from '@/features/manager'
import { OrderStatus } from '@/interfaces'
import { Tab } from '@/shared/ui'

export const OrderTabs = observer(() => {
  const {
    handleOrderTab,
    ortderTab,
    orderStatusInfo: { status },
  } = managersOrderStore

  return (
    <Flex gap={24}>
      <Tab
        id={OrderTabsTypes.storehouse}
        text='Склады и товары'
        checked={ortderTab === OrderTabsTypes.storehouse}
        handleClick={handleOrderTab}
      />
      <Tab
        id={OrderTabsTypes.delivery}
        text='Доставка'
        checked={ortderTab === OrderTabsTypes.delivery}
        handleClick={handleOrderTab}
        disabled={status === OrderStatus.canceled}
      />
    </Flex>
  )
})
