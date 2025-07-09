export type OrderStatusType =
  | 'Новый'
  | 'В работе'
  | 'Частично отправлен'
  | 'Отправлен'
  | 'Отменен покупателем'
  | 'Выполнен'
  | 'Отменен продавцом'

export interface IOrdersResponse {
  orders: IExpandedOrder[]
  totalNumber: number
}

export interface IExpandedOrder {
  id: string
  status: OrderStatusType
  internalNumber: number
  createdAt: string
  updatedAt: string
  responsibleManager: null | string
  totalOrderCost: number
  buyerType: 'физ.лицо' | 'юр.лицо'
  buyerName: string
  productsEnumerationTitle: string
  paymentStatus: string
  servingStatus: string
  comment: null | string
  deliveryMethod: string
  catalogType: string
}

export enum ExpandedOrderEnum {
  status = 'Статус заказа',
  internalNumber = 'Номер заказа',
  createdAt = 'Дата создания',
  // updatedAt = '2024-12-10T10=55=50.0239927',
  responsibleManager = 'Менеджер',
  totalOrderCost = 'Стоимость заказа',
  buyerType = 'Тип плательщика',
  buyerName = 'Покупатель',
  productsEnumerationTitle = 'Артикул/товары в заказе',
  paymentStatus = 'Статус оплаты',
  servingStatus = 'Служебный статус',
  comment = 'Комментарий',
  deliveryMethod = 'Доставка',
  catalogType = 'Тип каталога',
}

export interface ISellerOrdersFilters {
  // customerTitle?: string[]

  statuses?: string[]
  customerTypes?: string[]
  articles?: string[]
  paymentStatuses?: string[]
  deliveryMethods?: string[]
  managers?: string[]
  cataloges?: string[]
}

export type ChunkSizeType = 20 | 50 | 100
