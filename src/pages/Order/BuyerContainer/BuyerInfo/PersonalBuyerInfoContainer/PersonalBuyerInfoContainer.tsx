import { observer } from 'mobx-react-lite'
import { orderStore } from '@/features/order/model/orderStore'
import { PersonBuyerInfo } from '@/shared/ui'

export const PersonalBuyerInfoContainer = observer(() => {
  const { personBuyerInfo, otherPersonCheckboxChecked } = orderStore

  return <PersonBuyerInfo personalInfo={personBuyerInfo} isOtherPerson={otherPersonCheckboxChecked} />
})
