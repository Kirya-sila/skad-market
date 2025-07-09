import { IExpandedOrder, ISellerOrdersFilters } from '../model/types'

export const findFilterNameByKey = (key: keyof IExpandedOrder): keyof ISellerOrdersFilters | null => {
  switch (key) {
    //TODO: commented for the first release

    // case 'status':
    //   return 'statuses'
    // case 'buyerType':
    //   return 'customerTypes'
    // case 'productsEnumerationTitle':
    //   return 'articles'
    // case 'paymentStatus':
    //   return 'paymentStatuses'
    // case 'deliveryMethod':
    //   return 'deliveryMethods'
    // case 'responsibleManager':
    //   return 'managers'
    // case 'catalogType':
    //   return 'cataloges'

    default:
      return null
  }
}
