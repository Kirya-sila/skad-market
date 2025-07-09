import { observer } from 'mobx-react-lite'
import css from './Tabs.module.scss'
import { Buyer } from '@/constants'
import { orderStore } from '@/features/order/model/orderStore'
import { FlexRow, Tab } from '@/shared/ui'

export const Tabs = observer(() => {
  const { currentBuyerTypeTab: activeTab, setCurrentBuyerTypeTab: setActiveTab } = orderStore

  const handleClick = (id: Buyer) => {
    setActiveTab(id)
  }

  return (
    <FlexRow classname={css.container}>
      <Tab id={Buyer.Person} text='Физическое лицо' checked={activeTab === Buyer.Person} handleClick={handleClick} />
      <Tab id={Buyer.Legal} text='Юридическое лицо' checked={activeTab === Buyer.Legal} handleClick={handleClick} />
    </FlexRow>
  )
})
