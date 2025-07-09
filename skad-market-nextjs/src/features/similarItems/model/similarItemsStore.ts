import { makeAutoObservable } from 'mobx'
import { getSimilarRims, getSimilarRimsGrouped } from '../api'
import { IRimItemsGroup, RimDTO } from '@/entities/Rims/model/types'
import { ISimilarRimsItemsData, ISimilarRimsItemsDataGrouped } from '@/interfaces'
import { handleCatchedError } from '@/shared/libs'

class SimilarRimsItemsStore {
  similarRimsLoading = false
  similarRimsItemsData: RimDTO[] | [] = []
  similarRimsItemsDataGrouped: IRimItemsGroup[] | [] = []

  constructor() {
    makeAutoObservable(this)
  }

  getSimilarRimsItems = async (wheelCode: string) => {
    try {
      this.similarRimsLoading = true
      const data = await getSimilarRims(wheelCode)
      this.setSimilarRimsItems(data)
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.similarRimsLoading = false
    }
  }

  getSimilarRimsItemsGrouped = async (wheelCode: string) => {
    try {
      this.similarRimsLoading = true
      const data = await getSimilarRimsGrouped(wheelCode)
      this.setSimilarRimsItemsGrouped(data)
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.similarRimsLoading = false
    }
  }

  setSimilarRimsItems = (data: ISimilarRimsItemsData | undefined) => {
    this.similarRimsItemsData = data?.content ?? []
  }

  setSimilarRimsItemsGrouped = (data: ISimilarRimsItemsDataGrouped | undefined) => {
    this.similarRimsItemsDataGrouped = data?.content ?? []
  }

  get similarRimsItems() {
    return this.similarRimsItemsData
  }

  get similarRimsItemsGrouped() {
    return this.similarRimsItemsDataGrouped
  }
}

export const similarRimsItemsStore = new SimilarRimsItemsStore()
