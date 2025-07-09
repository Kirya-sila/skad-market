import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { makeAutoObservable } from 'mobx'
import { addToCart, deleteCartItems, getCart, restoreDeletedItem, updateCartItem } from '../api'
import { CartItemBody, ICartData, ICartItems } from '@/interfaces'
import { debounce, handleCatchedError } from '@/shared/libs'

// type SnackbarNotification = {
//   id: string
//   label: string
//   subLabel: string
//   type?: string
// }

const DELAY = 700

class CartStore {
  cartData: ICartItems[] = []
  rimsData: ICartItems[] = []
  tyresData: ICartItems[] = []
  checkedItems: string[] = []
  deletedItems: string[] = []
  addedToCartItems: string[] = []
  isAllChecked = false
  preferedCount: Record<string, number> = {}
  closeModal: VoidFunction = () => null
  isCartDataLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  getCartItems = async () => {
    this.isCartDataLoading = true
    try {
      const cartData: ICartData = await getCart()
      this.rimsData = cartData?.productCategories?.find((item) => item.title === 'Диски')?.items ?? []
      this.tyresData = cartData?.productCategories?.find((item) => item.title === 'Шины')?.items ?? []

      this.cartData = cartData?.productCategories?.reduce((data, currentData) => {
        return [...data, ...currentData.items]
      }, [] as ICartItems[])

      // const initiallyCheckedItems = this.cartData.map((item) => item.id)
      this.checkedItems = this.availableCartItemsIds

      this.preferedCount = {}
      this.cartData.forEach((item) => {
        this.preferedCount[item.id] = item.cartItemAmount || 1
      })
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.isCartDataLoading = false
    }
  }

  addItemToCart = async (item: CartItemBody) => {
    await addToCart(item)
    this.addedToCartItems = [...this.addedToCartItems, item.productId]

    this.resetDeletedItems()
    this.getCartItems()
  }

  onAllCheck = () => {
    if (!this.allChecked) {
      const allCheckedItems = this.availableCartItemsIds.filter((id) => !this.deletedItems.includes(id))
      this.checkedItems = allCheckedItems
    } else {
      this.checkedItems = []
    }
  }

  onItemCheck = (e: CheckboxChangeEvent, id: string) => {
    const checked = this.checkedItems.includes(id)

    if (!checked) {
      this.checkedItems.push(id)
    } else {
      const filteredItems = this.checkedItems.filter((item) => item !== id)
      this.checkedItems = filteredItems
    }
  }

  closeConfirmModal = (onClose: VoidFunction) => {
    this.closeModal = onClose
  }

  deleteOneItem = async (id: string) => {
    try {
      await deleteCartItems([id])
      this.addedToCartItems = this.addedToCartItems.filter((item) => item !== id)

      this.deletedItems.push(id)
      const filteredItems = this.checkedItems.filter((item) => item !== id)
      this.checkedItems = filteredItems
      this.closeModal()
      // this.preferedCount[id] = 0
    } catch (e) {
      handleCatchedError(e)
    }
  }

  deleteCheckedItems = async () => {
    try {
      await deleteCartItems(this.checkedItems)
      this.deletedItems = [...this.deletedItems, ...this.checkedItems]
      this.checkedItems = []
      this.closeModal()
      // this.getCartItems()
    } catch (e) {
      handleCatchedError(e)
    }
  }

  resetDeletedItems = () => {
    this.deletedItems = []
  }

  restoreItem = async (id: string) => {
    try {
      await restoreDeletedItem(id)
      const currentlyDeleted = this.deletedItems.filter((item) => item !== id)
      this.deletedItems = currentlyDeleted
      // this.getCartItems()
      this.checkedItems.push(id)
      // this.preferedCount[id] = 1
    } catch (e) {
      handleCatchedError(e)
    }
  }

  resetAddedItemsToCart = () => {
    this.addedToCartItems = []
  }

  debouncedClick = debounce((count, id) => {
    this.setItemsQuantity(id, count)
  }, DELAY)

  incrementCount = (id: string) => {
    this.preferedCount[id] += 1
    this.debouncedClick(this.preferedCount[id], id)
  }

  decrementCount = (id: string) => {
    this.preferedCount[id] -= 1
    this.debouncedClick(this.preferedCount[id], id)
  }

  setItemsQuantity = async (id: string, quantity: number) => {
    try {
      await updateCartItem({ id, quantity })
      this.preferedCount[id] = quantity
    } catch (e) {
      handleCatchedError(e)
    }
  }

  resetCheckedItems = () => {
    this.checkedItems = []
  }

  get summToPay() {
    return this.cartData.reduce((summ, item) => {
      if (this.checkedItems.includes(item.id)) {
        return summ + this.preferedCount[item.id] * item.retailPrice
      }
      return summ
    }, 0)
  }

  get totalCheckedItems() {
    return this.cartData.reduce((summ, item) => {
      if (this.checkedItems.includes(item.id)) {
        return summ + this.preferedCount[item.id]
      }
      return summ
    }, 0)
  }

  get totalItemsInCart() {
    return this.cartData.reduce((summ, item) => {
      return summ + this.preferedCount[item.id]
    }, 0)
  }

  get availableCartItemsIds() {
    return this.cartData.filter((item) => item.isItemInStock).map((item) => item.id)
  }

  get allChecked() {
    return this.checkedItems.length === this.availableCartItemsIds.filter((id) => !this.deletedItems.includes(id)).length
  }
}

export const cartStore = new CartStore()
