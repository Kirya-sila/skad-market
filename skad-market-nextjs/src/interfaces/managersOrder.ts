import { CancelOrderTypes } from '@/constants'

export interface IOrderChangesHistoryResponse {
  content: { changeHistoryRecords: IOrderChangesHistory[] }
  errors: string[]
  statusCode: string
  succeeded: boolean
}

export interface IOrderChangesHistory {
  createdAt: string
  userFullName: string
  operationType: string
  description: string
}

export interface ICancelReason {
  reason: CancelOrderTypes
  comment: string
}

export interface IManagersList {
  userId: string
  fullName: string
}

export interface IItemDeliveries {
  id: string
  orderWarehouseDeliveryConfigId: string
  offerName: string
  imageUrl: string
  itemsAmount: number
  deliveryType: string
  shipmentAddress: string
  deliveryAddress: string
}

export interface IOrderDeliveryTabData {
  id: string
  orderId: string
  warehouseId: string
  warehouseTitle: string
  warehouseAddress: string
  deliveryMethod: string
  deliveryRate: string
  planningShipmentDate: Date
  planningDeliveryDate: Date
  isDeliveryRequestSent: boolean
  itemDeliveries: IItemDeliveries[]
}

export interface IStoreOrderItemTable {
  orderItemId: string
  warehouseTitle: string
  totalAmountAtWarehouseStock: number
  reservedAmountAtWarehouse: number
  reserveStatus: string
}

export interface IMappedStoreOrderItemTable extends Partial<Omit<IStoreOrderItemTable, 'reservedAmountAtWarehouse'>> {
  orderItemId: string
  totalAmountAtWarehouseStock: number
  reservedAmountAtWarehouse: number | string
  totalReservedAmount?: number
}

export interface IOrderStoreData {
  id: string
  productId: string
  offerName: string
  itemsAmount: number
  retailPrice: number | null
  aggregatedOrderItemPrice: number | null
  totalAggregatedWeight: number
  boxSize: string
  imageUrl: string
  reservationData: IStoreOrderItemTable[]
}

export enum OrderStatus {
  new = 'Новый',
  inProgress = 'В работе',
  sent = 'Отправлен',
  canceled = 'Отменен',
}

export interface IManagersOrderData {
  order: {
    id: string
    internalNumber: number
    createdAt: Date
    updatedAt: Date
    status: OrderStatus
    servingStatus: string | null
    paymentMethod: string
    paymentStatus: string
    paymentDate: Date | null
    comment: string | null
    buyerType: string
    buyerFullName: string
    buyerPhonenumber: string
    buyerEmail: string | null
    isRecieverOtherPerson: boolean
    otherRecieverFullName: string
    otherRecieverPhonenumber: string | null
    estimatedDeliveryDate: Date
    totalDeliveryCost: number | null
    manager: {
      id: string
      firstName: string
      lastName: string
      middleName: string | null
    }
    orderWarehousesDeliveryConfigs: IOrderDeliveryTabData[] | null
    trackingNumber: string | null
  }
  orderItems: IOrderStoreData[]
  totalOrderCost: number
  totalItemsWeight: number
  totalItemsAmount: number
}
