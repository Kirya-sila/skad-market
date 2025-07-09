import { ReactNode } from 'react'
import { PromoButtonProps } from '@shared/ui'
import { AvailabilityStatuses, Params } from '@/constants'
import { Generation } from '@/features/SearchCar/model/types'
import { Colors } from '@/shared/types'

export interface RimFilter {
  /**
   * Комплект от n (например, 4)
   */
  setFrom: number
  /**
   * Диаметр
   */
  diameter: number[]
  /**
   * Количество крепежных отверстий
   */
  boltCount: number[]
  /**
   * Диаметр расположения отверстий
   */
  pcd: number[]
  /**
   * Вылет (ET)
   */
  offset: number[]
  /**
   * Ширина
   */
  width: number[]
  /**
   * Диаметр центрального отверстия
   */
  centralHoleDiameter: number[]
  /**
   * Новинки
   */
  isNew: boolean
  /**
   * Хиты
   */
  isHit: boolean
  /**
   * Цвет
   */
  color: Colors[]
  /**
   * Цена, как диапазон [мин, макс]
   */
  price: [number, number]
  /**
   * Бренды
   */
  brands: string[]
  /**
   * Модели
   */
  models: string[]
  /**
   * Индекс нагрузки
   */
  loadIndex: number[]
  /**
   * В наличии
   */
  inStock: boolean
  /**
   * Товары с отзывами
   */
  withReviews: boolean
}

export interface Price {
  current: number
  old?: number
  supTitle?: string
}

export interface Rim {
  id: string
  diameter: number
  width: number
  name: string
  color: string
  boltCount: number
  pcd: number
  offset: number
  centralHoleDiameter: number
  isNew: boolean
  isHit: boolean
  brand: string
  model: string
  loadIndex: number
  quantity: number
  labels: PromoButtonProps[]
  title: string
  price: Price
  images: ReactNode[]
  deliveryDate: number
}

export type FilterFunction = (rim: Rim) => boolean

export interface AdaptedRim {
  setFrom: number
  diameter: number
  boltCount: number
  pcd: number
  offset: number
  width: number
  centralHoleDiameter: number
  isNew: boolean
  isHit: boolean
  color: string
  priceRange: number
  brands: string
  models: string
  loadIndex: number
  inStock: boolean
  withReviews: boolean
}

export interface AvailableInputParams {
  Diameters: number[]
  MountHolesAmounts: number[]
  HoleDiameters: number[]
  Offsets: number[]
  WidthParams: number[]
  HubHoleDiameters: number[]
  LoadIndexes: number[]
  UniqueColors: string[]
  Brands: string[]
}

export interface AvailableParamsRequest {
  isInputParamsIncluded: boolean
  inputParams?: Partial<AvailableInputParams>
  modelParams?: { brand?: string | null; model?: string | null }
}

export interface RimDTO {
  colorName: string
  count: number
  sizeDesignation: string
  diameter: number
  drawingNumber: string
  id: string
  productCategoryId: string
  images: RimDTOImage[] | []
  lz: number
  modelName: string
  offerName: string
  pcd: number
  retailPrice: number

  hhDiameter?: number
  et?: number
  rimWidth?: number
  loadMax: number
  clientWeight?: number
  boxWeight?: number
  cylinderScrew?: string
  brandName?: string
  colorNameUnique: Colors
  wheelCode: string
  lz1_d1?: string
  lz1_d2?: string
  cap?: string
  label?: string
  oldRetailPrice?: number
  applicability?: Params
  availabilityStatus?: AvailabilityStatuses
}

export interface RimDTOImage {
  type: 'preview' | 'detail' | 'configurator'
  url: string
}

/**
 * 
Диаметр = diameter
DIA = hhDiameter
LZxPCD = lz + pcd
Диаметр расположения отверстий = pcd
Ширина = rimWidth
Максимальная нагрузка = loadMax
Количество крепежных отверстий = lz
Диаметр отверстия под болт/шпильку = lz1_d1
Диаметр отверстия под балонник = lz1_d2
Торговая марка = brandName
Масса диска с упаковкой = clientWeight + transportWeight (на данный момент нет обоих свойств в данных)
Масса диска = clientWeight |
Цвет = colorName
Унифицированный цвет = colorNameUnique
 */

export interface RimAssortmentPageRequest {
  limit: number
  offset: number
  sortDirection?: 'Asc' | 'Desc'
}

export interface IQuickChoiceParams {
  Diameters: number[]
  MountHolesAmounts: number[] | undefined
  HoleDiameters: number[] | undefined
  Offsets: number[] | undefined
  HubHoleDiameters: number[] | undefined
}

export interface FilterRimParams {
  IsSetStartingFromFour: boolean
  IsNewInAssortment: boolean
  IsBestsellers: boolean
  IsInStock: boolean
  IsAssortmentContainsReviews: boolean
  MinPriceAmount: number
  MaxPriceAmount: number
  Diameters: number[]
  MountHolesAmounts: number[]
  HoleDiameters: number[]
  Offsets: number[]
  WidthParams: number[]
  HubHoleDiameters: number[]
  LoadIndexes: number[]
  UniqueColors: string[]
  Brands: string[]
  // Models: string[]
  CarBrand: string
  CarModel: string
}

export interface RimAssortmentFilteredRequest {
  offset: number
  limit: number
  filterRimParams?: Partial<FilterRimParams>
  sortDirection?: 'Asc' | 'Desc'
}

export interface RimAssortmentPageResponse {
  chunkNumber: number
  rimAssortmentChunk: RimDTO[]
  rimsAmount: number
}

export interface IRimItemsGroup {
  drawingNumber: string
  astPerformance: number
  rims: RimDTO[]
}

export interface RimAssortmentPageResponseGrouped {
  chunkNumber: number
  rimsAmount: number
  rimAssortmentChunk: null
  rimItemsGroups: IRimItemsGroup[]
}

export interface InputRimParams {
  Diameters: number[]
  MountHolesAmounts: number[]
  HoleDiameters: number[]
  Offsets: number[]
  WidthParams: number[]
  HubHoleDiameters: number[]
  LoadIndexes: number[]
  UniqueColors: string[]
  Brands: string[]
  ParameterGroups: string[]
}

export interface SpecifiedCarRimParamsRequest {
  CarId?: number
  brand?: string
  model?: string
  ApplicabilityParam: keyof ParameterGroups
  InputRimParams?: Partial<InputRimParams>
}

export type SpecifiedCarRimParamsResponse = AvailableParams

export type AvailableParam = Record<string, boolean | number | string>

export type BaseFilterNames =
  | 'diameters'
  | 'mountHolesAmounts'
  | 'holeDiameters'
  | 'offsets'
  | 'widthParams'
  | 'hubHoleDiameters'
  | 'loadIndexes'
  | 'brands'

export type FilterName = BaseFilterNames | 'parameterGroups'

export type AvailableParams = Record<BaseFilterNames, AvailableParam> & { parameterGroups: ParameterGroups }

export type ActiveFilterName =
  | 'diameters'
  | 'mountHolesAmounts'
  | 'holeDiameters'
  | 'offsets'
  | 'widthParams'
  | 'hubHoleDiameters'
  | 'isNew'
  | 'isHit'
  | 'price'
  | 'color'
  | 'loadIndexes'
  | 'brands'
  // | 'models'
  | 'inStock'
  | 'setFrom'
  | 'carBrand'
  | 'carModel'

export type ResponseRimParams =
  | 'diameter'
  | 'hhDiameter'
  | 'et'
  | 'rimWidth'
  | 'pcd'
  | 'loadMax'
  | 'clientWeight'
  | 'cylinderScrew'
  | 'brandName'
  | 'colorName'
  | 'colorNameUnique'

export type ActiveParams = Record<ActiveFilterName, AvailableParam>

export type ActiveFilter = {
  name: ActiveFilterName
  values: string[]
}

export interface ParameterGroups {
  [Params.All]: boolean
  [Params.O]: boolean
  [Params.OT]: boolean
  [Params.T]: boolean
  [Params.TT]: boolean
}

export type CarModelGenerationType = {
  carId: number
  beginVIP: string
  endVIP: string
  bodyType: string
  bodyDefenition: string
  bodyDefenitionId?: number
  doorsAmount: number
  lzxpcd: string
}

type CarModelType = {
  modelTitle: string
  modelGenerations: Generation[]
}

export type RimCompatibleCarType = {
  brandTitle: string
  models: CarModelType[]
}
