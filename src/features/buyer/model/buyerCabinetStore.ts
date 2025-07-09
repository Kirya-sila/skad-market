import { makeAutoObservable } from 'mobx'
import { changeProfile, getProfileInfo } from '../api'
import { cartStore } from './../../cart/model/cartStore'
import { cancelBuyerOrder, getMenuItemsCount, getNotifications, getOneOrder, getOrders } from './../api/buyerApi'
import { toast } from '@/helpers'
import { IBuyerCabinetOrder, IBuyerProfileInfo, IBuyerProfileInfoResponse, IMenuItemsCount } from '@/interfaces'
import { profilePersonalInfoInitialValues } from '@/pages'
import { INotification } from '@/pages/BuyerCabinet/interfaces'
import { handleCatchedError } from '@/shared/libs'

class BuyerCabinetStore {
  userFullName = ''
  currentOrderInternalNumber = ''
  currentOrderId = ''
  orders: IBuyerCabinetOrder[] = []
  currentOrder: IBuyerCabinetOrder | Record<string, never> = {}
  addItemToCartLoading = false
  buyerPhone: string = 'Не указан'
  buyerPersonalInfo = profilePersonalInfoInitialValues
  currentProfileDeliveryAddress = ''
  currentProfileDeliveryType = ''
  checkedDeliveryOptionId = ''
  confirmBuyerDefaultDeliveryItemLoading = false
  seveNotesOptionsLoading = false
  showPreferedDeliveryItemsModal = false
  openedCancelOrderModalId = ''
  openConfirmCancelOrderModal = ''
  openNotesSetupModal = false
  orderItemsIdsToDelete: string[] = []
  deleteOrderItemsLoading = false
  initialNotesOptions: string[] = []
  checkedNotesOptions: string[] = []
  profileInfoLoading = false
  ordersLoading = false
  notificationsLoading = false
  menuItemsCountLoading = false
  buyerNotifications: INotification[] = []
  shouldMoveItemsToCart: boolean = false
  menuItemsCount = {} as IMenuItemsCount

  constructor() {
    makeAutoObservable(this)
  }

  getMenuItemsCount = async () => {
    this.menuItemsCountLoading = true
    try {
      const getItemsCount = await getMenuItemsCount()
      this.setMenuItemsCount(getItemsCount)
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.menuItemsCountLoading = false
    }
  }

  setMenuItemsCount = (menuItemsCount: IMenuItemsCount) => {
    this.menuItemsCount = menuItemsCount
  }

  getOrder = async (orderId: string) => {
    const order = await getOneOrder(orderId)
    this.currentOrder = order
  }

  getProfileInfo = async () => {
    this.profileInfoLoading = true
    try {
      const profileInfo: IBuyerProfileInfoResponse = await getProfileInfo()
      const { email, firstName, lastName, phoneNumber, userId } = profileInfo

      this.buyerPhone = phoneNumber || 'Не указан'
      this.setPersonalInfo({ firstName, lastName, email, userId })
      this.userFullName = `${firstName} ${lastName}`
      const lastOrder: IBuyerCabinetOrder[] = await getOrders(1, 1)
      this.setProfileDeliveryAddress(
        lastOrder && lastOrder.length > 0 ? lastOrder[0].completeAddressTitle : 'Не указан',
      )
      this.setProfileDeliveryType(lastOrder && lastOrder.length > 0 && lastOrder[0].isParcelShop)
      // deliveryItemsStore.setCheckedDeliveryOptionId('838dad7e-dfe0-4d95-ab35-1a0c9350311a')
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.profileInfoLoading = false
    }
  }

  updateProfile = async (body: IBuyerProfileInfo) => {
    await changeProfile({ ...this.buyerPersonalInfo, ...body })
    await this.getProfileInfo()
  }

  moveItemsToCart = (value: boolean) => {
    this.shouldMoveItemsToCart = value
  }

  gethNotifications = async ({ page, pageSize }: { page?: number; pageSize?: number } = {}) => {
    this.notificationsLoading = true
    try {
      const notificationsData = await getNotifications(page, pageSize)
      this.buyerNotifications = notificationsData
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.notificationsLoading = false
    }
  }

  getOrders = async ({ page, pageSize }: { page?: number; pageSize?: number } = {}) => {
    this.ordersLoading = true
    try {
      const ordersData = await getOrders(page, pageSize)
      this.orders = ordersData
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.ordersLoading = false
    }
  }

  confirmDeleteOrderItems = async (orderId: string) => {
    this.deleteOrderItemsLoading = true
    try {
      await cancelBuyerOrder({
        orderId,
        addToCart: this.shouldMoveItemsToCart,
        orderItemIds: this.orderItemsIdsToDelete,
      })
      this.moveItemsToCart(false)
      this.orderItemsIdsToDelete = []
      this.showConfirmCancelOrderModal('')

      if (window.location.pathname === '/buyer/orders') {
        await this.getOrders()
        await this.getMenuItemsCount()
      } else {
        await this.getOrder(orderId)
      }
      await cartStore.getCartItems()
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.deleteOrderItemsLoading = false
    }
  }

  setPersonalInfo = (data: IBuyerProfileInfo) => {
    this.buyerPersonalInfo = { ...this.buyerPersonalInfo, ...data }
  }

  setProfileDeliveryAddress = (address: string) => {
    this.currentProfileDeliveryAddress = address
  }

  setProfileDeliveryType = (isParselShop: boolean) => {
    this.currentProfileDeliveryType = isParselShop ? 'Пункт выдачи DPD' : 'Курьерская доставка DPD'
  }

  confirmBuyerDefaultDeliveryItem = async () => {
    //TODO: add confirm delivery item here
    this.confirmBuyerDefaultDeliveryItemLoading = true
    //should be like this: confirmBuyerDefaultDeliveryItem(deliveryItemsStore.checkedDeliveryOptionId)
    this.confirmBuyerDefaultDeliveryItemLoading = false
  }

  getNotesOptions = async () => {
    //TODO: add request to get initial notes options
    this.initialNotesOptions = ['sms']
  }

  saveNotesOptions = async () => {
    try {
      this.seveNotesOptionsLoading = true
      //TODO: add logic to save options here
      this.initialNotesOptions = this.checkedNotesOptions
      this.showNotesSetupModal(false)
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message)
      }
    } finally {
      this.seveNotesOptionsLoading = false
    }
  }

  closePreferedDeliveryItemsModal = () => {
    this.showPreferedDeliveryItemsModal = false
  }

  openPreferedDeliveryItemsModal = () => {
    this.showPreferedDeliveryItemsModal = true
  }

  addOrderItemToCart = async (orderItemId: string, orderId: string) => {
    this.addItemToCartLoading = true
    //TODO: add method to move item from the order to the cart
    this.addItemToCartLoading = false
  }

  evaluateProduct = async (orderItemId: string, orderId: string) => {
    //TODO: eveluate product method to be added
  }

  showCancelOrderModal = (id: string) => {
    this.openedCancelOrderModalId = id
  }

  showConfirmCancelOrderModal = (id: string) => {
    this.openConfirmCancelOrderModal = id
  }

  setOrderItemsIdsToDelete = (orderItemsIdsToDelete: string[]) => {
    this.orderItemsIdsToDelete = orderItemsIdsToDelete
  }

  setCurrentOrderId = (orderId: string) => {
    this.currentOrderId = orderId
  }

  showNotesSetupModal = (open: boolean) => {
    this.openNotesSetupModal = open
    if (open) {
      this.checkedNotesOptions = this.initialNotesOptions
    }
  }

  setCheckedNotesOptions = (notesOptions: string[]) => {
    this.checkedNotesOptions = notesOptions
  }

  get hasBuyerEmail() {
    return !!this.buyerPersonalInfo.email
  }
}

export const buyerCabinetStore = new BuyerCabinetStore()
