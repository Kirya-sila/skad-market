import { RimDTO } from '@entities/Rims/model/types'

export interface BrandCountry {
  countryName: string
  brands: string[]
}

export type BrandCountries = BrandCountry[]

export type CountryEntry = {
  title: string
  entries: [string, string[]][]
}

export type BrandModels = string[]

export type Entry = [string, string[]]

export type BrandStructure = { title: string; entries: Entry[] }

export interface Generation {
  beginEndVIP: null
  beginVIP: string
  endVIP: string
  bodyType: string
  bodyDefenition: string
  bodyDefenitionId?: number
  doorsAmount: number
  carId: number
  lzxpcd: string
}

export interface SpecifiedCarRequest {
  Brand: string
  Model: string
  BeginVIP: string
  EndVIP: string
  BodyType: string
  BodyDefenitionId: number
  DoorsAmount: number
  CarId: number
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
}

export interface SpecifiedCarFilteredRequest {
  offset: number
  limit: number
  CarId: number
  ApplicabilityParam: string
  filterRimParams?: Partial<FilterRimParams>
  sortDirection?: 'Asc' | 'Desc'
}

export type SpecifiedCarResponse = RimDTO[]

export interface CarData {
  beginVIP: string
  bodyDefinitionId: number
  bodyDefinition: string
  bodyType: string
  endVIP: string
  firm: string
  id: number
  lzxpcd: string
  model: string
  novelty: string
  doorsAmount: number
}

export interface CarDataWithParams extends CarData {
  params: string[]
}

export interface CurrentCar {}

export interface ISpecifiedCarsLoadingProps {
  offset: number
  limit: number
  append?: boolean
}
