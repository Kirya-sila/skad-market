import { LngLat } from '@yandex/ymaps3-types'
import { Buyer, PaymentPlan } from '@/constants'

export interface IPerson {
  personFirstName: string
  personLastName: string
  personPhone: string
  personEmail: string
  otherFirstName?: string
  otherLastName?: string
  otherPhone?: string
}

export interface ILegal {
  companyName: string
  kpp: string
  bic: string
  bankName: string
  account: string
  correspondedAccount: string
  legalAddress: string
  address: string
  firstName: string
  lastName: string
  phone: string
}

export type TSubmitFormValues = { [Buyer.Person]: IBuyerContactInfo } | { [Buyer.Legal]: ILegal }

export interface DeliveryPointInfo {
  address: string
  workingTime: string
  deliveryCost: number
  deliveryDate: string
}

export interface OrderItemData {
  aggregatedOrderItemPrice: number
  boxSize: string
  imageUrl: string
  itemsAmount: number
  offerName: string
  productCategoryTitle: 'Диски' | 'Шины'
  productId: string
  totalAggregatedWeight: number
  id: string
}

// export interface IOrderDeliveryGroupItem {
//   deliveryAddressId: string
//   deliveryAddressTitle: string
//   deliveryCost: number
//   estimatedDeliveryDate: Date
//   id: string
//   orderItems: OrderItem[]
//   parcelShopId: string
//   workingTime: string
// }

export interface IOrderDeliveryData {
  cityName: string
  completeAddressTitle: string
  estimatedDeliveryDate: Date | null
  isExtractionSucceded: boolean
  isParcelShop: boolean
  totalDeliveryCost: number | null
  workingTime: string
  deliveryPointId: string
  parcelShopWorkingDaysSchedule: string
}

export interface Order {
  content: {
    id: string
    orderDeliveryData: IOrderDeliveryData
    allOrderItems: OrderItemData[]
    paymentMethod: PaymentPlan
    status: string
    totalItemsAmount: number
    totalItemsWeight: number
    totalOrderCost: number
    buyerFullName: string
    buyerPhoneNumber: string
    createdAt: Date
    internalNumber: number
    isRecieverOtherPerson: boolean
    otherRecieverFullName: string
    otherRecieverPhonenumber: string
  }
}

export interface IDeliveryInfo {
  id: string
  workingDaysSchedule: string
  cityName: string
  completeAddress: string
  addressDescription: string
}

export interface IDeliveryAddress {
  flatNumber: string
  floor?: string
  entrance?: string
  cityName?: string
}

export interface DeliveryPoint {
  addressDescription: string
  cityName: string
  completeAddress: string
  id: string
  latitude: number
  longitude: number
  workingDaysSchedule: string
}

export interface DeliveryContent {
  content: {
    cityName: string
    orderId: string
    parcelShops: DeliveryPoint[]
  }
}

export interface ILocation {
  center: LngLat
  zoom: number
}

export interface IAddressesList {
  value: string
  country: string | null
  city: string
  street: string | null
  postalCode: string | null
  house: string | null
}

export interface IBuyerOtherPersonContactInfo {
  otherPersonFirstName?: string | null
  otherPersonLastName?: string | null
  otherPersonPhoneNumber?: string | null
}

export interface IBuyerContactInfo extends IBuyerOtherPersonContactInfo {
  email?: string | null
  firstName: string
  lastName: string
  phoneNumber: string
  isOtherPerson: boolean
  orderId: string
}

export interface IBuyerContactInfoResponse {
  succeeded: boolean
  content: IBuyerContactInfo
  errors: string[]
  statusCode: string
}

export interface IUserDeliveryItem {
  id: string
  addressTitle: string
  isDeliveryAddress: boolean
  latitude: number
  longitude: number
}

export interface IDeliveryOptionsWithItems {
  id: string
  orderId: string
  isDeliveryAddress: boolean
  orderItemIds: string[]
}

export interface IDeleteDeliveryItemOptions {
  id: string
  isDeliveryAddress: boolean
}

export interface IDeliveryPointWorkingOptionsModal {
  onClose: VoidFunction
  title?: string
  deliveryOptions: Omit<
    IOrderDeliveryData,
    'isExtractionSucceded' | 'isParcelShop' | 'cityName' | 'deliveryPointId' | 'parcelShopWorkingDaysSchedule'
  >
}

// export interface IUserDeliveryItemsResponseData {
//   succeeded: boolean
//   content: IUserDeliveryItem[]
//   errors: string[]
//   statusCode: string
// }
