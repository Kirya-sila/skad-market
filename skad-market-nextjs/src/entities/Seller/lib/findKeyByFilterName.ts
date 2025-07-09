

import { IExpandedOrder, ISellerOrdersFilters } from '../model/types'

export const findKeyByFilterName = (key: keyof ISellerOrdersFilters): keyof IExpandedOrder | null => {
  switch (key) {
    case 'statuses':
      return 'status'
    case 'customerTypes':
      return 'buyerType'
    case 'articles':
      return 'productsEnumerationTitle'
    case 'paymentStatuses':
      return 'paymentStatus'
    case 'deliveryMethods':
      return 'deliveryMethod'
    case 'managers':
      return 'responsibleManager'
    case 'cataloges':
      return 'catalogType'

    default:
      return null
  }
}

