import { makeAutoObservable } from 'mobx'
import { getUserDeliveryItems } from '../api'
import { IUserDeliveryItem } from '@/interfaces'

class DeliveryItemsStore {
  userDeliveryItems: IUserDeliveryItem[] = []
  checkedDeliveryOptionId = ''

  constructor() {
    makeAutoObservable(this)
  }

  getUserDeliveryItems = async () => {
    const userDeliveryItems = await getUserDeliveryItems()
    this.setUserDeliveryItems(userDeliveryItems)
  }

  setUserDeliveryItems = (userDeliveryItems: IUserDeliveryItem[] | undefined) => {
    this.userDeliveryItems = userDeliveryItems ?? []
  }

  setCheckedDeliveryOptionId = (deliveryItemId: string) => {
    this.checkedDeliveryOptionId = deliveryItemId
  }

  onCheckDeliveryItem = (id: string) => {
    this.checkedDeliveryOptionId = id
  }

  get hasUserDeliveryItems() {
    return !!this.userDeliveryItems.length
  }
}

export const deliveryItemsStore = new DeliveryItemsStore()
