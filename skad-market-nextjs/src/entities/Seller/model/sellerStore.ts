import { makeAutoObservable } from 'mobx'
import { fetchSellerOrderFilters } from '../api/fetchSellerOrderFilters'
import { fetchSellerOrders } from '../api/fetchSellerOrders'
import { IExpandedOrder, ChunkSizeType, ISellerOrdersFilters } from './types'
import { handleCatchedError } from '@/shared/libs'

class SellerStore {
  orders: IExpandedOrder[] = []
  sortBy: keyof IExpandedOrder = 'status'
  sortDirection: 'Asc' | 'Desc' = 'Asc'
  selectedOrderIds: string[] = []
  allOrderIds: string[] = []
  chunkSize: ChunkSizeType = 20
  chunkNumber = 1
  totalNumber = 0
  selectedFilters: ISellerOrdersFilters = {}
  internalNumber = ''
  creationDateStartRange = ''
  creationDateEndRange = ''
  allFilterValues: ISellerOrdersFilters = {}
  hideOrderColumns: (keyof IExpandedOrder)[] = []
  excludeOrderItems: (keyof IExpandedOrder)[] = ['status', 'internalNumber', 'createdAt', 'buyerName']
  error: string | null = null
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }
  public setLoading = (isLoading: boolean) => {
    this.isLoading = isLoading
  }

  public setError = (error: string | null) => {
    this.error = error
  }

  public handleError = (e: unknown) => {
    const error = handleCatchedError(e)
    this.setError(error)
  }

  public getSellerOrders = async () => {
    this.setLoading(true)
    this.setError(null)
    try {
      const newData = await fetchSellerOrders(
        this.chunkSize,
        this.chunkNumber,
        this.creationDateStartRange,
        this.creationDateEndRange,
        this.internalNumber,
        this.selectedFilters,
      )
      this.orders = newData?.orders ?? []
      this.totalNumber = newData?.totalNumber ?? 0

      this.selectedOrderIds = []
      this.allOrderIds = this.orders.reduce((acc: string[], item) => {
        acc.push(item.id)
        return acc
      }, [])
    } catch (error) {
      this.handleError(error)
    } finally {
      this.setLoading(false)
    }
  }
  public getSellerFilters = async () => {
    this.setLoading(true)
    this.setError(null)
    try {
      const newData = await fetchSellerOrderFilters()
      this.allFilterValues = newData
    } catch (error) {
      this.handleError(error)
    } finally {
      this.setLoading(false)
    }
  }
  public setSelectedFilters = (filterName: keyof ISellerOrdersFilters, value: string) => {
    const newFilters = { ...this.selectedFilters }
    if (this.selectedFilters[filterName]) {
      const values = this.selectedFilters[filterName]
      if (values && values.length) {
        if (values?.includes(value)) {
          const filteredArr = values?.filter((item) => item !== value)
          newFilters[filterName] = filteredArr
        } else {
          newFilters[filterName] = [...values, value]
        }
      }
    } else {
      newFilters[filterName] = [value]
    }
    this.selectedFilters = newFilters
  }
  public clearAllSelectedFilters = () => {
    this.selectedFilters = {}
  }
  public clearOneSelectedFilter = (filterName: keyof ISellerOrdersFilters) => {
    const newFilters = { ...this.selectedFilters }
    if (newFilters[filterName]) {
      delete newFilters[filterName]
    }
    this.selectedFilters = newFilters
  }
  public selectOrderId = (value: string) => {
    if (this.selectedOrderIds.includes(value)) {
      const filteredArr = this.selectedOrderIds.filter((item) => item !== value)
      this.selectedOrderIds = filteredArr
    } else {
      this.selectedOrderIds = [...this.selectedOrderIds, value]
    }
  }
  public clearSelectedOrderIds = () => {
    this.selectedOrderIds = []
  }
  public setSelectedAllOrderIds = () => {
    this.selectedOrderIds = this.allOrderIds
  }
  public setChunkSize = (value: ChunkSizeType) => {
    this.chunkSize = value
    this.setPageNumber(1)
  }
  public setPageNumber = (page = 1) => {
    this.chunkNumber = page
  }
  public changeHideOrderColumns = (value: keyof IExpandedOrder) => {
    if (this.hideOrderColumns.includes(value)) {
      const filteredArr = this.hideOrderColumns.filter((item) => item !== value)
      this.hideOrderColumns = filteredArr
    } else {
      this.hideOrderColumns = [...this.hideOrderColumns, value]
    }
  }
  public setInternalNumber = (value: string) => {
    this.internalNumber = value
  }
  public setDateStartRange = (value: string) => {
    this.creationDateStartRange = value
  }
  public setDateEndRange = (value: string) => {
    this.creationDateEndRange = value
  }
}

export const sellerStore = new SellerStore()
