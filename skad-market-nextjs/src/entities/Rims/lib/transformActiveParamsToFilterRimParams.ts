import { ActiveParams, AvailableInputParams } from '@entities/Rims/model/types'
import { FilterRimParams } from '@/features/SearchCar/model/types'

export const transformActiveParamsToFilterRimParams = (input: ActiveParams): Partial<FilterRimParams> | undefined => {
  const convertToArray = (obj: Record<string, any>): number[] =>
    Object.keys(obj)
      .filter((key) => obj[key])
      .map((key) => parseFloat(key))

  const convertToStringArray = (obj: Record<string, any>): string[] => Object.keys(obj).filter((key) => obj[key])

  const result: AvailableInputParams = {
    Diameters: convertToArray(input.diameters),
    MountHolesAmounts: convertToArray(input.mountHolesAmounts),
    HoleDiameters: convertToArray(input.holeDiameters),
    Offsets: convertToArray(input.offsets),
    WidthParams: convertToArray(input.widthParams),
    HubHoleDiameters: convertToArray(input.hubHoleDiameters),
    LoadIndexes: convertToArray(input.loadIndexes),
    UniqueColors: convertToStringArray(input.color),
    Brands: convertToStringArray(input.brands),
  }

  const allArraysEmpty = Object.values(result).every((arr) => arr.length === 0)

  return allArraysEmpty ? undefined : result
}
