import { RimDTOImage } from '@/entities/Rims/model/types'

export interface CartItemBody {
  productId: string
  productCategoryId: string
  quantity: number
}

export interface ICartItems {
  id: string
  isItemInStock: boolean
  offerName: string
  productCategoryId: string
  productCategoryTitle: string
  productId: string
  productWheelCode: string
  cartItemAmount: number
  stockAmount: number
  retailPrice: number
  images: RimDTOImage[]
  minimumToBuy?: number
}

export interface IProductCategories {
  id: string
  title: string
  items: ICartItems[]
}

export interface ICartData {
  cartId: string
  cost: number
  cartItemsCount: number
  productCategories: IProductCategories[]
}
