import { ActiveParams, FilterRimParams, IQuickChoiceParams } from '@entities/Rims/model/types'
import { IMobileRimSpecifications, IRimSpecifications } from '@/interfaces'

export const convertActiveParamsToFilterRimParams = (activeParams: ActiveParams) => {
  const {
    brands,
    color,
    diameters,
    holeDiameters,
    hubHoleDiameters,
    inStock,
    isHit,
    isNew,
    loadIndexes,
    // models,
    mountHolesAmounts,
    offsets,
    price,
    setFrom,
    widthParams,
    carBrand,
    carModel,
  } = activeParams

  const convertToArray = (obj: Record<string, any>): number[] =>
    Object.keys(obj)
      .filter((key) => obj[key])
      .map((key) => parseFloat(key))

  const convertToStringArray = (obj: Record<string, any>): string[] => Object.keys(obj).filter((key) => obj[key])
  const convertToString = (obj: Record<string, any>): string => {
    return Object.keys(obj).filter((key) => key)[0]
  }

  const filterRimParams: FilterRimParams = {
    IsSetStartingFromFour: (setFrom[4] || false) as boolean,
    IsNewInAssortment: (isNew['-'] || false) as boolean, // TODO
    IsBestsellers: (isHit['-'] || false) as boolean,
    IsInStock: (inStock['-'] || false) as boolean,
    IsAssortmentContainsReviews: false, // mvp
    MinPriceAmount: price.min as number,
    MaxPriceAmount: price.max as number,
    Diameters: convertToArray(diameters),
    MountHolesAmounts: convertToArray(mountHolesAmounts),
    HoleDiameters: convertToArray(holeDiameters),
    Offsets: convertToArray(offsets),
    WidthParams: convertToArray(widthParams),
    HubHoleDiameters: convertToArray(hubHoleDiameters),
    LoadIndexes: convertToArray(loadIndexes),
    UniqueColors: convertToStringArray(color),
    Brands: convertToStringArray(brands),
    // Models: convertToStringArray(models),
    CarBrand: convertToString(carBrand),
    CarModel: convertToString(carModel),
  }

  return filterRimParams
}

export const convertQuickChoiceParamsToFilter = (params: Partial<IRimSpecifications>) => {
  const filterRimParams: IQuickChoiceParams = {
    Diameters: params.Diameters ? [Number(params.Diameters)] : [],
    MountHolesAmounts: params.MountHolesAmounts ? [Number(params.MountHolesAmounts)] : [],
    HoleDiameters: params.HoleDiameters ? [Number(params.HoleDiameters)] : [],
    Offsets: params.Offsets ? [Number(params.Offsets)] : [],
    HubHoleDiameters: params.HubHoleDiameters ? [Number(params.HubHoleDiameters)] : [],
  }

  return filterRimParams
}

export const convertQuickChoiceParamsToActiveParams = (params: IRimSpecifications) => {
  const activeParams: Partial<ActiveParams> = {
    diameters: params.Diameters ? { [params.Diameters]: true } : {},
    mountHolesAmounts: params.MountHolesAmounts ? { [params.MountHolesAmounts]: true } : {},
    holeDiameters: params.HoleDiameters ? { [params.HoleDiameters]: true } : {},
    offsets: params.Offsets ? { [params.Offsets]: true } : {},
    hubHoleDiameters: params.HubHoleDiameters ? { [params.HubHoleDiameters]: true } : {},
  }

  return activeParams
}

const getSelectedActiveParams = (params: number[]) => {
  return params.reduce((acc, item) => {
    return { ...acc, [item]: true }
  }, {})
}

export const convertMobileQuickChoiceParamsToActiveParams = (params: Partial<IMobileRimSpecifications>) => {
  const mobileActiveParams: Partial<ActiveParams> = {
    diameters: params.Diameters ? getSelectedActiveParams(params.Diameters) : {},
    mountHolesAmounts: params.MountHolesAmounts ? getSelectedActiveParams(params.MountHolesAmounts) : {},
    holeDiameters: params.HoleDiameters ? getSelectedActiveParams(params.HoleDiameters) : {},
    offsets: params.Offsets ? getSelectedActiveParams(params.Offsets) : {},
    hubHoleDiameters: params.HubHoleDiameters ? getSelectedActiveParams(params.HubHoleDiameters) : {},
  }

  return mobileActiveParams
}

export const convertMobileQuickChoiceParamsToFilter = (params: Partial<IMobileRimSpecifications>) => {
  const mobileFilterRimParams: IQuickChoiceParams = {
    Diameters: params.Diameters ? params.Diameters : [],
    MountHolesAmounts: params.MountHolesAmounts ? params.MountHolesAmounts : [],
    HoleDiameters: params.HoleDiameters ? params.HoleDiameters : [],
    Offsets: params.Offsets ? params.Offsets : [],
    HubHoleDiameters: params.HubHoleDiameters ? params.HubHoleDiameters : [],
  }

  return mobileFilterRimParams
}
