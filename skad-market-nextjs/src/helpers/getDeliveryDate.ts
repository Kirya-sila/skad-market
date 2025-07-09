import { getOrderDateString } from './getDateString'

export const getDeliveryDate = () => {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + 3)
  return getOrderDateString(currentDate)
}
