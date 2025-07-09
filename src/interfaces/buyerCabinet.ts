import { BuyerOrderPaymentStatusEnum, BuyerOrderStatusEnum } from '@/pages'

export interface IBuyerCabinetOrder {
  id: string
  internalNumber: number
  createdAt: string
  totalDeliveryCost: number | null
  status: BuyerOrderStatusEnum
  orderStatusDate: string
  paymentStatus: keyof typeof BuyerOrderPaymentStatusEnum
  paymentMethod: string
  allOrderItems: IOrderItem[]
  updatedAt: string | null
  deliveryDate: string
  buyerFullName: string
  buyerPhonenumber: string
  isRecieverOtherPerson: boolean
  otherRecieverFullName: string
  otherRecieverPhonenumber: string
  //не хватает
  promocode: string
  promocodeDiscount: number | null
  orderCost: number
  totalOrderCost: number
  discount: number | null
  trackingNumber: number | string | null
  estimatedDeliveryDate: Date | null
  isParcelShop: boolean
  deliveryPointId: string
  parcelShopWorkingDaysSchedule: string
  cityName: string
  completeAddressTitle: string
}

export interface IBuyerProfileInfo {
  userId: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}
export interface IBuyerProfileInfoResponse extends IBuyerProfileInfo {
  userId: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

export interface IOrderItem {
  id: string
  offerName: string //'Литые диски Rebel (КС913) 7.000xR17 5x114.3 DIA67.1 ET50 Блэк Джек'
  imageUrl: string //уточнить
  aggregatedOrderItemPrice: number
  orderItemStatus: 'inProgress' | 'waitingForPayment' | 'delivered' | 'canceled'
  isParcelShop: boolean
  estimatedDeliveryDate: string | null
  trackingNumber?: number | string | null
  itemsAmount: number
  totalAggregatedWeight: number
  wheelCode: string
}

export interface ICancelOrderBody {
  orderId: string
  orderItemIds: string[]
  addToCart: boolean
}

export interface IMenuItemsCount {
  allOrders: number | null
  allNotifications: number | null
}
