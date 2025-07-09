import { ActiveParams } from '@/entities/Rims/model/types'

export const PRICE_MIN = 0

export const PRICE_MAX = 300000

// const IGNORED_AVAILABLE_FILTER_PARAMS = ['parameterGroups']

export const RIMS_FILTER_LIST = [
  'setFrom',
  'diameters',
  'mountHolesAmounts',
  'holeDiameters',
  'offsets',
  'widthParams',
  'hubHoleDiameters',
  'isNew', // -
  'isHit', // -
  'price', // -
  'color', // -
  'brands',
  // 'models',
  'loadIndexes',
  'inStock',
  // 'withReviews' нет в mvp
]
//
// export const initialRimFilter: RimFilter = {
//   setFrom: 4,
//   diameter: [14, 15],
//   boltCount: [],
//   pcd: [],
//   offset: [],
//   width: [],
//   centralHoleDiameter: [],
//   isNew: false,
//   isHit: true,
//   color: [],
//   price: [PRICE_MIN, PRICE_MAX],
//   brands: [],
//   models: [],
//   loadIndex: [],
//   inStock: false,
//   withReviews: false,
// }

export const INITIAL_ACTIVE_PARAMS: ActiveParams = {
  diameters: {},
  mountHolesAmounts: {},
  holeDiameters: {},
  offsets: {},
  widthParams: {},
  hubHoleDiameters: {},
  isNew: {},
  isHit: {},
  price: { min: PRICE_MIN, max: PRICE_MAX },
  color: {},
  loadIndexes: {},
  brands: {},
  // models: {},
  inStock: {},
  setFrom: {},
  carBrand: {},
  carModel: {},
}

export const SORT_LOCALIZED = {
  Asc: 'Сначала дешевые',
  Desc: 'Сначала дорогие',
}
