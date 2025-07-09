import { LngLat } from '@yandex/ymaps3-types'
import { makeAutoObservable } from 'mobx'
import { IPromiseBasedObservable } from 'mobx-utils'
import { generatePath } from 'react-router-dom'
import {
  confirmDeliveryAddress,
  confirmDeliveryPoint,
  deleteDeliveryItem,
  deleteOrderItem,
  getAddresses,
  getAllDeliveryPoints,
  getBuyerInfo,
  getDeliveryPointsByQuery,
  getOrder,
  getUserDeliveryItems,
  initOrder,
  saveBuyerInfo,
  setDeliveryPointToOrderItems,
  submitOrder,
} from '../api/orderApi'

import { router } from '@/app'
import { appRoutes } from '@/app-settings'
import { DEFAULT_COORDINATES, legalInitialValues, personInitialValues } from '@/constants'
import { Buyer, DeliveryType, PaymentPlan } from '@/constants/enums'
import { authorizationStore } from '@/features/authorization'
import { cartStore } from '@/features/cart'
import { removePhonePrefix } from '@/helpers'
import {
  DeliveryContent,
  DeliveryPoint,
  IAddressesList,
  IBuyerContactInfoResponse,
  IDeliveryAddress,
  ILocation,
  IOrderDeliveryData,
  IUserDeliveryItem,
  Order,
  OrderItemData,
  TSubmitFormValues,
} from '@/interfaces'
import { debounce, handleCatchedError } from '@/shared/libs'
import { deliveryItemsStore } from '@/features/deliveryItems'

const defaultBuyerInfo = {
  [Buyer.Person]: personInitialValues,
  [Buyer.Legal]: legalInitialValues,
}

class OrderStore {
  initOrderIdPromise?: IPromiseBasedObservable<{ orderId: string }>
  orderId = ''
  showMapModal = false
  showPreferedDeliveryItemsModal = false
  orderStatus = ''
  isLoading = false
  isSubmitOrderLoading = false
  isBuyerInfoLoading = false
  itemsToAlignToDeliveryWay: string[] = []
  orderItems: OrderItemData[] = []
  orderDeliveryData: IOrderDeliveryData | undefined
  totalOrderCost = 0
  totalItemsWeight = 0
  totalItemsAmount = 0
  internalNumber = 0
  currentBuyerTypeTab: Buyer = Buyer.Person
  currentDeliveryTypeTab: DeliveryType = DeliveryType.PVZ
  submittedForm: Buyer | null = Buyer.Person
  wayToPay: PaymentPlan = PaymentPlan.Delivery
  buyerInfo = {
    [Buyer.Person]: personInitialValues,
    [Buyer.Legal]: legalInitialValues,
  }
  deliveryPoints: DeliveryPoint[] = []
  onMapDeliveryPoints: DeliveryPoint[] = []
  // deliveryPointsCoordinates: [number, number][] | undefined
  deliveryPointInfo: DeliveryPoint | undefined
  locationCoordinates: LngLat | undefined
  location: ILocation | undefined
  currentZoom = 10
  deliveryUserAddress = {
    addressTitle: '',
    flatNumber: '',
    entrance: '',
    floor: '',
    cityName: '',
    latitude: 0,
    longitude: 0,
  }
  searchInputValue = ''
  lastValidSearchInputValue = ''
  suggestions: IAddressesList[] = []
  addresses: string[] = []
  suggestedCities: string[] = []
  deliveryPointsSuggestions: string[] = []
  deliveryPointsSuggestionsObjects: DeliveryPoint[] = []
  checkedCity = ''
  checkedDeliveryOptionId = ''
  // userDeliveryItems: IUserDeliveryItem[] = []
  isSuggestionsOnLastRequest = false
  submitOrderServerError = ''
  setDeliveryLocationLoading = false
  //TODO: change wayToPay to false once other ways to pay added
  formTouched = { buyerInfo: false, deliveryInfo: false }
  deleteOrderItemLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  openMapModal = () => {
    this.showMapModal = true
  }

  closeMapModal = () => {
    this.showMapModal = false
    this.resetSearchInput()
    this.deliveryPointInfo = undefined
    this.location = undefined
    this.setCurrentDeliveryTypeTab(DeliveryType.PVZ)
  }

  openPreferedDeliveryItemsModal = () => {
    this.showPreferedDeliveryItemsModal = true
  }

  closePreferedDeliveryItemsModal = () => {
    this.showPreferedDeliveryItemsModal = false
  }

  setCurrentBuyerTypeTab = (tab: Buyer) => {
    this.currentBuyerTypeTab = tab
  }

  setSubmittedForm = (tab: Buyer) => {
    this.submittedForm = tab
    this.searchInputValue = ''
  }

  saveBuyerInfo = async (values: TSubmitFormValues, orderId: string) => {
    const buyerInfo = { ...defaultBuyerInfo, ...values }
    const buyerInfoCopy: typeof buyerInfo = JSON.parse(JSON.stringify(buyerInfo))
    buyerInfo.person.phoneNumber = `+7${buyerInfo.person.phoneNumber}`
    // if (!buyerInfo.person.isOtherPerson) {
    //   buyerInfo.person = { ...buyerInfo.person, ...otherPersonInitialValues }
    // } else
    if (buyerInfo.person.otherPersonPhoneNumber) {
      buyerInfo.person.otherPersonPhoneNumber = `+7${buyerInfo.person.otherPersonPhoneNumber}`
    }

    if (this.currentBuyerTypeTab === Buyer.Person) {
      try {
        await saveBuyerInfo(orderId, buyerInfo[Buyer.Person])
        this.buyerInfo = buyerInfoCopy
        this.handleBuyerInfoTouched(false)
      } catch (e) {
        handleCatchedError(e)
      }
    }
  }

  setPaymentPlan = (id: PaymentPlan) => {
    this.wayToPay = id
  }

  setCurrentDeliveryTypeTab = (tab: DeliveryType) => {
    this.currentDeliveryTypeTab = tab
  }

  initOrder = async (ids: string[]) => {
    try {
      this.setLoadingStatus(true)
      const response = await initOrder(ids)
      const id = response.content?.orderId ?? ''
      this.orderId = id
      router.navigate(generatePath(appRoutes.order, { id }))
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.setLoadingStatus(false)
      if (authorizationStore.openAuthorizationModal) {
        authorizationStore.handleOpenAuthorizationModal(false)
        authorizationStore.resetModalState()
      }
    }
  }

  deleteDeliveryItem = async (id: string) => {
    const isDeliveryAddress = this.checkIsDeliveryAddress(id)
    try {
      await deleteDeliveryItem({ id, isDeliveryAddress })
      // this.closePreferedDeliveryItemsModal()
      deliveryItemsStore.getUserDeliveryItems()
    } catch (e) {
      handleCatchedError(e)
    }
  }

  getBuyerInfo = async (orderId: string) => {
    try {
      this.isBuyerInfoLoading = true
      const data = await getBuyerInfo(orderId)
      this.setPersonBuyerInfo(data)
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.isBuyerInfoLoading = false
    }
  }

  setPersonBuyerInfo = (buyerInfoData: IBuyerContactInfoResponse | undefined) => {
    let buyerInfo
    const content = buyerInfoData?.content
    if (content) {
      buyerInfo = {
        ...content,
        phoneNumber: removePhonePrefix(content.phoneNumber),
        otherPersonPhoneNumber: removePhonePrefix(content.otherPersonPhoneNumber),
      }
    } else {
      buyerInfo = personInitialValues
    }
    this.handleBuyerInfoTouched(false)
    this.buyerInfo[Buyer.Person] = buyerInfo
  }

  getOrder = async (id: string) => {
    this.orderId = id
    try {
      this.setLoadingStatus(true)
      const order: Order | undefined = await getOrder(id)
      deliveryItemsStore.getUserDeliveryItems()
      this.setOrderDataItems(order)
      this.setDefaultCheckedDeliveryItem(order?.content.orderDeliveryData)
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.setLoadingStatus(false)
    }
  }

  deleteOrderItem = async (orderItemId: string, orderId: string) => {
    this.deleteOrderItemLoading = true
    try {
      await deleteOrderItem(orderItemId)
      this.deleteOrderItemLoading = false
      this.getOrder(orderId)
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.deleteOrderItemLoading = false
    }
  }

  setDefaultCheckedDeliveryItem = (deliveryData: IOrderDeliveryData | undefined) => {
    deliveryItemsStore.checkedDeliveryOptionId = deliveryData?.deliveryPointId ?? ''
  }

  setOrderDataItems = (order: Order | undefined) => {
    this.orderItems = order?.content.allOrderItems ?? []
    this.orderDeliveryData = order?.content.orderDeliveryData
    this.totalOrderCost = order?.content.totalOrderCost ?? 0
    this.totalItemsWeight = order?.content.totalItemsWeight ?? 0
    this.totalItemsAmount = order?.content.totalItemsAmount ?? 0
    this.internalNumber = order?.content.internalNumber ?? 0
  }

  setLoadingStatus = (status: boolean) => {
    this.isLoading = status
  }

  submitOrder = async (id = '') => {
    try {
      this.setSubmitOrderLoading(true)
      await submitOrder(id)
      cartStore.resetCheckedItems()
      router.navigate(generatePath(appRoutes.appliedOrderInfo, { id: this.internalNumber }))
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.setSubmitOrderLoading(false)
      this.resetTouchAllSections()
    }
  }

  setSubmitOrderLoading = (loading: boolean) => {
    this.isSubmitOrderLoading = loading
  }

  setSearchInputValue = (value: string) => {
    this.searchInputValue = value
  }

  resetSearchInput = () => {
    this.searchInputValue = ''
    this.lastValidSearchInputValue = ''
  }

  setLastValidSearchInputValue = (value: string) => {
    this.lastValidSearchInputValue = value
  }

  getAddressesSuggestions = debounce((value: string) => {
    this.getSuggestionAddressesList(value)
  }, 300)

  getDeliveryPointsSuggestions = debounce((value: string) => {
    this.getDeliveyPointsListSuggestions(value)
  }, 300)

  getSuggestionAddressesList = async (value: string) => {
    try {
      const data: { content: IAddressesList[] } = await getAddresses(value)
      this.isSuggestionsOnLastRequest = true
      this.suggestions = data?.content ?? []

      const addresses = this.suggestions.map((item) => item.value)
      const suggestedCities = this.suggestions.map((item) => item.city)
      this.addresses = addresses
      this.suggestedCities = suggestedCities
    } catch (e) {
      this.isSuggestionsOnLastRequest = false
      handleCatchedError(e)
    }
  }

  setSuggestion = (value: string) => {
    this.setSearchInputValue(value)
    this.setLastValidSearchInputValue(value)
    if (this.currentDeliveryTypeTab === DeliveryType.PVZ) {
      const deliveryPoint = this.deliveryPointsSuggestionsObjects.find((item) => item.completeAddress === value)
      this.setDeliveryPoint(deliveryPoint?.id ?? '')
    } else {
      this.checkedCity = this.suggestions.find((item) => item.value === value)?.city ?? ''
    }
  }

  getDeliveyPointsListSuggestions = async (query: string) => {
    const data: DeliveryContent | undefined = await getDeliveryPointsByQuery({
      orderId: this.orderId,
      query,
    })
    this.deliveryPointsSuggestionsObjects = data?.content?.parcelShops ?? []
    this.deliveryPointsSuggestions = this.deliveryPointsSuggestionsObjects.map((point) => point.completeAddress)
  }

  getAllDeliveryPoints = async () => {
    const points: DeliveryContent | undefined = await getAllDeliveryPoints({
      orderId: this.orderId,
    })
    // this.setDelveryPointsCoordinates(points?.content.parcelShops ?? [])
    this.setDeliveryPoints(points?.content.parcelShops ?? [])
  }

  getLocationCoordinatesByText = async (text: string) => {
    const result = await ymaps3.search({ text })
    const coordinates = result[0].geometry?.coordinates
    this.location = { center: coordinates ?? DEFAULT_COORDINATES, zoom: this.currentZoom }
    // this.setLocationCoordinates(coordinates)
  }

  setDeliveryPoints = (points: DeliveryPoint[]) => {
    this.deliveryPoints = points
  }

  setLocationCoordinates = (locationCoordinates: LngLat | undefined) => {
    this.locationCoordinates = locationCoordinates
  }

  setLocation = async (coordinates: LngLat, zoom?: number) => {
    this.location = { center: coordinates, zoom: zoom ?? this.currentZoom }
    // this.setSuggestion(this.addresses[0])

    // if (this.currentDeliveryTypeTab === DeliveryType.PVZ) {
    //   this.getLocationCoordinatesByText(this.suggestions[0].city ?? '')
    // }

    if (this.currentDeliveryTypeTab === DeliveryType.Courier) {
      await this.getSaggestionAddressesByCoordinates(coordinates)

      this.setLastValidSearchInputValue(this.addresses[0])
      this.setSearchInputValue(this.addresses[0])
      this.checkedCity = this.suggestedCities[0]
    }
  }

  setCurrentZoom = (zoom: number) => {
    this.currentZoom = zoom
  }

  setCurrentLocationToShowOnMap = async (coordinates: LngLat) => {
    const zoom = 16
    this.currentZoom = zoom
    this.location = { center: coordinates, zoom }

    if (this.currentDeliveryTypeTab === DeliveryType.PVZ) {
      this.getDeliveyPointsListSuggestions(this.searchInputValue)
    } else {
      await this.getSaggestionAddressesByCoordinates(coordinates)
    }
  }

  getSaggestionAddressesByCoordinates = async (location: LngLat) => {
    const result = await ymaps3.search({ text: location as unknown as string })

    const description = result[0].properties.description
    const name = result[0].properties.name
    const checkedLocationAddress = `${description},  ${name}`
    await this.getSuggestionAddressesList(checkedLocationAddress)
  }

  lookOnMap = async (id: string) => {
    const deliveryItem = deliveryItemsStore.userDeliveryItems.find((item) => item.id === id)
    const coordinates: LngLat = [deliveryItem?.longitude ?? 0, deliveryItem?.latitude ?? 0]
    this.setCurrentDeliveryTypeTab(deliveryItem?.isDeliveryAddress ? DeliveryType.Courier : DeliveryType.PVZ)
    this.setSearchInputValue(deliveryItem?.addressTitle ?? '')

    await this.setCurrentLocationToShowOnMap(coordinates)
    this.openMapModal()
    this.closePreferedDeliveryItemsModal()
  }

  setDeliveryPoint = (id: string) => {
    this.handleDeliveryInfoTouched(false)
    const currentDeliveryPoint = this.deliveryPoints.find((point) => point.id === id)
    const currentCoordinates = this.location?.center
    const checkedDelivPointCoords = [currentDeliveryPoint?.longitude, currentDeliveryPoint?.latitude]

    if (JSON.stringify(currentCoordinates) !== JSON.stringify(checkedDelivPointCoords)) {
      this.location = {
        center: [currentDeliveryPoint?.longitude ?? 0, currentDeliveryPoint?.latitude ?? 0],
        zoom: this.currentZoom,
      }
    }

    this.setSearchInputValue(currentDeliveryPoint?.completeAddress ?? '')
    this.deliveryPointInfo = currentDeliveryPoint
  }

  resetDeliveryPointInfo = () => {
    this.deliveryPointInfo = undefined
  }

  setDeliveryPointToOrderItems = async (isDeliveryAddress?: boolean) => {
    this.setDeliveryLocationLoading = true
    const orderItemIds = this.orderItems.map((orderItem) => orderItem.id)
    try {
      await setDeliveryPointToOrderItems({
        id: deliveryItemsStore.checkedDeliveryOptionId,
        orderId: this.orderId,
        orderItemIds,
        isDeliveryAddress: isDeliveryAddress ?? this.currentDeliveryTypeTab === DeliveryType.Courier,
      })
      this.getOrder(this.orderId)
      this.closeMapModal()
      this.closePreferedDeliveryItemsModal()
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.setDeliveryLocationLoading = false
    }
  }

  willGetFromHere = () => {
    const isDeliveryAddress = deliveryItemsStore.userDeliveryItems.find(
      (item) => item.id === deliveryItemsStore.checkedDeliveryOptionId,
    )?.isDeliveryAddress
    this.setDeliveryPointToOrderItems(isDeliveryAddress)
  }

  confirmDeliveryPoint = async () => {
    try {
      const parcelShopId = await confirmDeliveryPoint(this.deliveryPointInfo?.id ?? '')
      deliveryItemsStore.setCheckedDeliveryOptionId(parcelShopId ?? '')
      this.setDeliveryPointToOrderItems()
    } catch (e) {
      handleCatchedError(e)
    }
  }

  confirmDeliveryAddress = async (values: IDeliveryAddress) => {
    this.deliveryUserAddress = {
      ...this.deliveryUserAddress,
      ...values,
      addressTitle: this.searchInputValue,
      cityName: this.checkedCity,
      longitude: this.location?.center[0] ?? 0,
      latitude: this.location?.center[1] ?? 0,
    }
    try {
      this.setDeliveryLocationLoading = true
      const addressId = await confirmDeliveryAddress(this.deliveryUserAddress)
      deliveryItemsStore.setCheckedDeliveryOptionId(addressId ?? '')
      await this.setDeliveryPointToOrderItems()
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.setDeliveryLocationLoading = false
    }
  }

  checkIsDeliveryAddress = (id: string) => {
    return deliveryItemsStore.userDeliveryItems.find((item) => item.id === id)?.isDeliveryAddress ?? false
  }

  handleBuyerInfoTouched = (touched: boolean) => {
    this.formTouched = { ...this.formTouched, buyerInfo: touched }
  }

  handleDeliveryInfoTouched = (touched: boolean) => {
    this.formTouched = { ...this.formTouched, deliveryInfo: touched }
  }

  handleTouchAllSections = () => {
    this.formTouched = { buyerInfo: true, deliveryInfo: true }
  }

  resetTouchAllSections = () => {
    this.formTouched = { buyerInfo: false, deliveryInfo: false }
  }

  get getOrderItems() {
    return this.orderItems
  }

  get hasBuyerInfoTouched() {
    return this.formTouched.buyerInfo
  }

  get hasDeliveryInfoTouched() {
    return this.formTouched.deliveryInfo
  }

  get isAllSectionsTouched() {
    return JSON.stringify(this.formTouched) === JSON.stringify({ buyerInfo: true, deliveryInfo: true })
  }

  get hasPersonBuyerInfo() {
    if (
      JSON.stringify(this.buyerInfo[Buyer.Person]) !== JSON.stringify(personInitialValues) &&
      this.buyerInfo[Buyer.Person].lastName &&
      this.buyerInfo[Buyer.Person].firstName
    ) {
      return true
    }
    return false
  }

  get hasDeliveryInfo() {
    return !!(this.deliveryPointInfo || this.orderDeliveryData)
  }

  get hasWayToPay() {
    return !!this.wayToPay
  }

  get hasAllSectionsEmpty() {
    return !(this.hasPersonBuyerInfo || this.hasDeliveryInfo || this.hasWayToPay)
  }

  get isDeliveryAddress() {
    return this.checkIsDeliveryAddress(deliveryItemsStore.checkedDeliveryOptionId)
  }

  get getOnMapDeliveryPoints() {
    return this.currentDeliveryTypeTab === DeliveryType.PVZ ? this.deliveryPoints : []
  }

  get showDeliveryPointInfo() {
    return this.currentDeliveryTypeTab === DeliveryType.PVZ
  }

  get personBuyerInfo() {
    return this.buyerInfo[Buyer.Person]
  }

  get otherPersonCheckboxChecked() {
    return this.buyerInfo[Buyer.Person].isOtherPerson
  }
}

export const orderStore = new OrderStore()
