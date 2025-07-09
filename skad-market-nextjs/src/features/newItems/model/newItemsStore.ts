import { makeAutoObservable } from 'mobx'
import { getNewRims, getNewRimsGrouped } from '../api'
import { IRimItemsGroup, RimDTO } from '@/entities/Rims/model/types'
import { INewRimsItemsData, INewRimsItemsDataGrouped } from '@/interfaces'
import { handleCatchedError } from '@/shared/libs'

class NewRimsItemsStore {
  newRimsLoading = false
  newRimsItemsData: RimDTO[] | [] = []
  newRimsItemsDataGrouped: IRimItemsGroup[] | [] = []

  constructor() {
    makeAutoObservable(this)
  }

  getNewRimsItems = async () => {
    try {
      this.newRimsLoading = true
      const data = await getNewRims()
      this.setNewRimsItems(data)
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.newRimsLoading = false
    }
  }

  getNewRimsItemsGrouped = async () => {
    try {
      this.newRimsLoading = true
      const data = await getNewRimsGrouped()
      this.setNewRimsItemsGrouped(data)
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.newRimsLoading = false
    }
  }

  setNewRimsItems = (data: INewRimsItemsData | undefined) => {
    this.newRimsItemsData = data?.content ?? []
  }

  setNewRimsItemsGrouped = (data: INewRimsItemsDataGrouped | undefined) => {
    this.newRimsItemsDataGrouped = data?.content ?? []
  }

  get newRimsItems() {
    return this.newRimsItemsData
  }

  get newRimsItemsGrouped() {
    return this.newRimsItemsDataGrouped
  }
}

export const newRimsItemsStore = new NewRimsItemsStore()
