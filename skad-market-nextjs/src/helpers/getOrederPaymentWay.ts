import { PaymentPlan } from '@/constants'

export const getOrederPaymentWay = (paymentPlan: PaymentPlan) => {
  switch (paymentPlan) {
    case PaymentPlan.Delivery:
      return 'При получении'
    case PaymentPlan.Installment:
      return 'Рассрочка'
    default:
      return 'Оплата онлайн'
  }
}
