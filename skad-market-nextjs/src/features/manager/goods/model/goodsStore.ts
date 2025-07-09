import { GoodsStatus } from '@/constants'
import { makeAutoObservable } from 'mobx'

class GoodsStore {
  availabilityFilter: GoodsStatus | string = ''

  constructor() {
    makeAutoObservable(this)
  }

  handleAvavilability = (value: GoodsStatus | string) => {
    this.availabilityFilter = value
  }
}

export const goodsStore = new GoodsStore()
