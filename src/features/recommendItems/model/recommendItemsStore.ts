import { makeAutoObservable } from 'mobx'
import { getRecommendRims, getRecommendRimsGrouped } from '../api'
import { IRimItemsGroup, RimDTO } from '@/entities/Rims/model/types'
import { INewRimsItemsData, IRecommendRimsItemsDataGrouped } from '@/interfaces'
import { handleCatchedError } from '@/shared/libs'

class RecommendRimsItemsStore {
  recommendRimsLoading = false
  recommendRimsItemsData: RimDTO[] | [] = []
  recommendRimsItemsDataGrouped: IRimItemsGroup[] | [] = []

  constructor() {
    makeAutoObservable(this)
  }

  getRecommendRimsItems = async () => {
    try {
      this.recommendRimsLoading = true
      const data = await getRecommendRims()
      this.setRecommendRimsItems(data)
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.recommendRimsLoading = false
    }
  }

  getRecommendRimsItemsGrouped = async () => {
    try {
      this.recommendRimsLoading = true
      const data = await getRecommendRimsGrouped()
      this.setRecommendRimsItemsGrouped(data)
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.recommendRimsLoading = false
    }
  }

  setRecommendRimsItems = (data: INewRimsItemsData | undefined) => {
    this.recommendRimsItemsData = data?.content ?? []
  }

  setRecommendRimsItemsGrouped = (data: IRecommendRimsItemsDataGrouped | undefined) => {
    this.recommendRimsItemsDataGrouped = data?.content ?? []
  }

  get recommendRimsItems() {
    return this.recommendRimsItemsData
  }

  get recommendRimsItemsGrouped() {
    return this.recommendRimsItemsDataGrouped
  }
}

export const recommendRimsItemsStore = new RecommendRimsItemsStore()
