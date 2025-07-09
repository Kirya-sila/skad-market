import { makeAutoObservable } from 'mobx'
import {
  cancelOrder,
  getManagersList,
  getManagersOrder,
  getOrderChangesHistory,
  getOrderFormFile,
  sendOrderToDelivery,
  setManager,
} from '../api/managerOrderAPI'
import { CancelOrderTypes, OrderTabsTypes } from '@/constants'
import { toast } from '@/helpers'
import { ICancelReason, IManagersList, IManagersOrderData, IOrderChangesHistory } from '@/interfaces'
import { handleCatchedError } from '@/shared/libs'

const defaultCancelReasonValues = { reason: CancelOrderTypes.outOfStock, comment: '' }

class ManagersOrderStore {
  ortderTab: OrderTabsTypes = OrderTabsTypes.storehouse
  historyModalOpen = false
  cancelOrderModalOpen = false
  chooseManagerModalOpen = false
  confirmCancelOrderModalOpen = false
  orderCanceledModalOpen = false
  orderCanceled = false
  orderCanceledInfoModalOpen = false
  loading = false
  assignManagerLoading = false
  orderDataLoading = false
  orderHistoryLoading = false
  sendAllLoading = false
  planingShipmentDateLoading = false
  cancelOrderReason: ICancelReason = defaultCancelReasonValues
  orderChangesHistory: IOrderChangesHistory[] = []
  managersListData: IManagersList[] = []
  assignedManager = ''
  managersOrderData: IManagersOrderData | undefined

  constructor() {
    makeAutoObservable(this)
  }

  handleOrderTab = (tab: OrderTabsTypes) => {
    this.ortderTab = tab
  }

  getManagersOrder = async (orderId: string) => {
    try {
      this.orderDataLoading = true
      const data = await getManagersOrder(orderId)
      this.setManagersOrderData(data)
      this.setManager(data?.order.manager?.id ?? '')
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.orderDataLoading = false
    }
  }

  setManagersOrderData = (data: IManagersOrderData | undefined) => {
    this.managersOrderData = data
  }

  getManagersList = async () => {
    try {
      this.loading = true
      const managersList = await getManagersList()
      this.setManagersList(managersList)
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.loading = false
    }
  }

  setManagersList = (managersData: IManagersList[] | undefined) => {
    this.managersListData = managersData ?? []
  }

  assignManager = async (orderId: string, mnanagerId: string) => {
    try {
      this.assignManagerLoading = true
      await setManager(orderId, mnanagerId)
      this.handleOpenChooseManagerModal(false)

      // reloading order data once manager has been assigned
      this.getManagersOrder(orderId)
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.assignManagerLoading = false
    }
  }

  getOrderHistory = async (orderId: string) => {
    try {
      this.orderHistoryLoading = true
      const orderChangesHistoryData = await getOrderChangesHistory(orderId)

      // reloading order data once manager has been assigned
      this.setOrderChangesHistory(orderChangesHistoryData?.content.changeHistoryRecords ?? [])
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.orderHistoryLoading = false
    }
  }

  setOrderChangesHistory = (data: IOrderChangesHistory[]) => {
    this.orderChangesHistory = data
  }

  setManager = (mnanagerId: string) => {
    this.assignedManager = mnanagerId
  }

  // handleChooseManager = (manager: string) => {
  //   this.assignedManager = manager
  // }

  handleOpenHistoryModal = (open: boolean) => {
    this.historyModalOpen = open
  }

  handleOpenCancelOrderModal = (open: boolean) => {
    this.cancelOrderModalOpen = open
  }

  handleOpenChooseManagerModal = (open: boolean) => {
    this.chooseManagerModalOpen = open
  }

  handleOpenConfirmCancelOrder = (open: boolean) => {
    this.confirmCancelOrderModalOpen = open
  }

  handleCancelOrderReason = (reason: CancelOrderTypes) => {
    this.cancelOrderReason.reason = reason
  }

  handleCancelOrderReasonComment = (comment: string) => {
    this.cancelOrderReason.comment = comment
  }

  resetCancelOrderForm = () => {
    this.cancelOrderReason = defaultCancelReasonValues
  }

  confirmOrderCancel = async (orderId: string) => {
    this.loading = true
    try {
      await cancelOrder({
        orderId,
        orderCancellationReason: this.cancelOrderReason.reason,
        comment: this.cancelOrderReason.comment,
        managerId: this.assignedManager,
      })
      await this.getManagersOrder(orderId)
      this.handleOpenConfirmCancelOrder(false)
      this.orderCanceledInfoModalOpen = true
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.loading = false
    }
  }

  sendOrderToDelivery = async (orderId: string) => {
    this.sendAllLoading = true
    try {
      await sendOrderToDelivery({ orderId })
      this.getManagersOrder(orderId)
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.sendAllLoading = false
    }
  }

  // setPlanningShipmentDate = async (orderId: string, planningShipmentDate: string) => {
  //   this.setPlaningShipmentDateLoading(true)
  //   try {
  //     await setPlanningShipmentDate({ orderId, planningShipmentDate })
  //     // this.getManagersOrder(orderId)
  //   } catch (e) {
  //     if (e instanceof Error) {
  //       toast.error(e.message)
  //     }
  //   } finally {
  //     this.setPlaningShipmentDateLoading(false)
  //   }
  // }

  setPlaningShipmentDateLoading = (value: boolean) => {
    this.planingShipmentDateLoading = value
  }

  getOrderFormFile = async (orderId: string) => {
    try {
      const gerOrderFormFile = await getOrderFormFile(orderId)
      const file = new Blob([gerOrderFormFile], { type: 'application/pdf' })
      const fileUrl = URL.createObjectURL(file)
      window.open(fileUrl)
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message)
        console.log(e.message)
      }
    }
  }

  handleOpenOrderCanceledInfoModal = (open: boolean) => {
    this.orderCanceledInfoModalOpen = open
  }

  get orderNumber() {
    const { internalNumber } = this.managersOrderData?.order ?? {}
    return { internalNumber }
  }

  get trackNumber() {
    const { trackingNumber } = this.managersOrderData?.order ?? {}
    return trackingNumber ?? ''
  }

  get managersListOptions() {
    return this.managersListData?.map(({ fullName, userId }) => ({ item: fullName, value: userId }))
  }

  get assignedManagerFullName() {
    if (this.managersOrderData?.order.manager) {
      return `${this.managersOrderData?.order.manager.lastName} ${this.managersOrderData?.order.manager.firstName}`
    }
    return ''
  }

  get orderStatusInfo() {
    const { status, paymentStatus, createdAt, updatedAt, paymentDate } = this.managersOrderData?.order ?? {}
    return { status, paymentStatus, createdAt, updatedAt, paymentDate }
  }

  get warehouseData() {
    return this.managersOrderData?.orderItems || []
  }

  get deliveryData() {
    return this.managersOrderData?.order.orderWarehousesDeliveryConfigs
  }

  get buyerCardData() {
    const { buyerType, buyerEmail, buyerFullName, buyerPhonenumber, otherRecieverFullName, otherRecieverPhonenumber } =
      this.managersOrderData?.order ?? {}
    return { buyerType, buyerEmail, buyerFullName, buyerPhonenumber, otherRecieverFullName, otherRecieverPhonenumber }
  }

  get paymentsCardData() {
    const { paymentMethod, totalDeliveryCost } = this.managersOrderData?.order ?? {}
    return { paymentMethod, totalDeliveryCost }
  }

  get commentsCardData() {
    const { comment } = this.managersOrderData?.order ?? {}
    return comment
  }

  get deliveryCost() {
    const { totalDeliveryCost } = this.managersOrderData?.order ?? {}
    return totalDeliveryCost
  }

  get servingStatus() {
    const { servingStatus } = this.managersOrderData?.order ?? {}
    return servingStatus
  }

  get summaryInfoCardData() {
    const { totalOrderCost, totalItemsAmount, totalItemsWeight } = this.managersOrderData ?? {}
    return { totalOrderCost, totalItemsAmount, totalItemsWeight }
  }
}

export const managersOrderStore = new ManagersOrderStore()
