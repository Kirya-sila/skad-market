export interface ICarModel {
  brand: string
  models: string[]
}

export type ByMountAndDiametrItem = {
  diameter: number
  mountParams: {
    lz: number
    pcd: number
  }[]
}

export type ByMountItem = {
  lz: number
  pcd: number
}
