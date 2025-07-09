import { OrderStatusType } from "@/entities/Seller/model/types"

export const findClassName = (status: OrderStatusType): string => {
    switch (status) {
      case 'Новый':
        return 'green'
      case 'Отменен покупателем':
      case 'Отменен продавцом':
        return 'orange'
      case 'Выполнен':
        return 'gray'
      default:
        return 'black'
    }
  }