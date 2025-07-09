import { CharachteristicAvailability, GoodsProperties, GoodsStatus } from '@/constants'

export interface IGoodsData {
  id: React.Key
  [GoodsProperties.status]: GoodsStatus
  [GoodsProperties.img]: string
  [GoodsProperties.productsEnumerationTitle]: string
  [GoodsProperties.updatedAt]: string
  [GoodsProperties.internalNumber]: string
  [GoodsProperties.ourCost]: string
  [GoodsProperties.buyerCost]: string
  [GoodsProperties.itemsAmount]: number
  [GoodsProperties.width]: number
  [GoodsProperties.profile]: number
  [GoodsProperties.diameter]: string
  [GoodsProperties.season]: string
  [GoodsProperties.spikes]: string
  [GoodsProperties.spikesType]: string
  [GoodsProperties.speedIndex]: string
  [GoodsProperties.loadIndex]: number
  [GoodsProperties.runFlat]: CharachteristicAvailability
  [GoodsProperties.construction]: string
  [GoodsProperties.sealingMethod]: string
  [GoodsProperties.profileType]: string
  [GoodsProperties.treadPattern]: string
  [GoodsProperties.bumpStop]: CharachteristicAvailability
  [GoodsProperties.extraLoad]: CharachteristicAvailability
  [GoodsProperties.country]: string
  [GoodsProperties.weight]: number
  [GoodsProperties.brandName]: string
}
