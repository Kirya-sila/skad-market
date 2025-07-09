import { makeAutoObservable } from 'mobx'
import { rimsStore } from '@/entities/Rims'
import { fetchAvailableParams } from '@/entities/Rims/api/fetchAvailableParams'
import {
  convertMobileQuickChoiceParamsToActiveParams,
  convertMobileQuickChoiceParamsToFilter,
  convertQuickChoiceParamsToActiveParams,
  convertQuickChoiceParamsToFilter,
} from '@/entities/Rims/lib/convertActiveParamsToFilterRimParams'
import { INITIAL_ACTIVE_PARAMS } from '@/entities/Rims/model/const'
import {
  AvailableInputParams,
  AvailableParam,
  AvailableParams,
  FilterName,
  IQuickChoiceParams,
  ParameterGroups,
} from '@/entities/Rims/model/types'
import { IDropdownOption, IMobileFilterParams, IMobileRimSpecifications, IRimSpecifications, RimSpecifications } from '@/interfaces'

const sortAvailableParams = (availableParams: ParameterGroups | AvailableParam) =>
  Object.keys(availableParams)
    .filter((key) => availableParams[key as keyof (AvailableParam | ParameterGroups)])
    .sort((a, b) => Number(a) - Number(b))

class QuickChoiceByParamsStore {
  isLoading = false
  allAvailableParams: AvailableParams | undefined
  currentlyAvailableParams: AvailableParams | undefined
  filterParams: Partial<IQuickChoiceParams> = {}
  inputParams: Partial<AvailableInputParams> = {}
  allDropdownOptions: Record<FilterName, IDropdownOption[]> | undefined = undefined
  mobileSelectedParams = {} as IMobileRimSpecifications

  constructor() {
    makeAutoObservable(this)
  }

  getAllAvailableParams = async () => {
    const allAvailableParams = await fetchAvailableParams({
      isInputParamsIncluded: true,
    })
    this.setAllAvailableParams(allAvailableParams)

    this.currentlyAvailableParams = allAvailableParams
    this.getDropdownOptions()
    // this.prepareSelectOptions(allAvailableParams)
  }

  getAvailableParams = async (inputParams: Partial<AvailableInputParams>) => {
    this.inputParams = { ...this.inputParams, ...inputParams }
    const currentlyAvailableParams = await fetchAvailableParams({
      isInputParamsIncluded: true,
      inputParams: this.inputParams,
    })
    this.currentlyAvailableParams = currentlyAvailableParams

    this.getDropdownOptions()
  }

  getMobileAvailableParams = async (inputParams: Record<RimSpecifications, number[]>) => {
    this.inputParams = { ...this.inputParams, ...inputParams }
    const currentlyAvailableParams = await fetchAvailableParams({
      isInputParamsIncluded: true,
      inputParams: this.inputParams,
    })
    this.currentlyAvailableParams = currentlyAvailableParams
  }

  loadRimsData = async (params: IRimSpecifications) => {
    const activeParams = convertQuickChoiceParamsToActiveParams(params)
    this.filterParams = convertQuickChoiceParamsToFilter(params)
    // const availabaleParams = { ...INITIAL_ACTIVE_PARAMS, ...(this.currentlyAvailableParams ?? {}) }
    // delete availabaleParams.parameterGroups

    rimsStore.activeParams = { ...INITIAL_ACTIVE_PARAMS, ...activeParams }
    await rimsStore.loadAssortmentFiltered(this.filterParams)
    await rimsStore.reloadAvailableParams()
  }

  loadMobileRimsData = async (params: IMobileRimSpecifications) => {
    this.mobileSelectedParams = params
    const activeParams = convertMobileQuickChoiceParamsToActiveParams(params)
    this.filterParams = convertMobileQuickChoiceParamsToFilter(params)

    rimsStore.activeParams = { ...INITIAL_ACTIVE_PARAMS, ...activeParams }
    await rimsStore.loadAssortmentFiltered(this.filterParams)
    await rimsStore.reloadAvailableParams()
  }

  setAllAvailableParams = (allAvailableParams: AvailableParams) => {
    this.allAvailableParams = allAvailableParams ?? {}
  }

  getDropdownOptions = () => {
    const optionKeys = Object.keys(this.currentlyAvailableParams ?? {}) as FilterName[]

    const allDropdownOptions = optionKeys.map((key) => {
      const currentDropdownAvailableParams = this.currentlyAvailableParams?.[key] ?? {}
      const currentDropdownOptions = sortAvailableParams(currentDropdownAvailableParams).map((key) => ({
        value: key,
        label: key,
      }))
      return { [key]: currentDropdownOptions }
    })

    let allOptions = {} as Record<FilterName, IDropdownOption[]>
    allDropdownOptions.forEach((item) => {
      allOptions = { ...allOptions, ...item }
    })

    this.allDropdownOptions = allDropdownOptions.reduce(
      (all, current) => {
        return { ...all, ...current }
      },
      {} as Record<FilterName, IDropdownOption[]>,
    )
  }

  resetInputParams = () => {
    this.inputParams = {}
  }

  get diameters() {
    const currentDropdownAvailableParams = this.currentlyAvailableParams?.diameters ?? {}
    return sortAvailableParams(currentDropdownAvailableParams).map((item) => ({
      value: item,
      label: `R${item}`,
    }))
  }

  get hubHoleDiameters() {
    return this.allDropdownOptions?.hubHoleDiameters ?? []
  }

  get mountHolesAmounts() {
    return this.allDropdownOptions?.mountHolesAmounts ?? []
  }

  get holeDiameters() {
    return this.allDropdownOptions?.holeDiameters ?? []
  }

  get offsets() {
    return this.allDropdownOptions?.offsets ?? []
  }

  get mobileFiltersByParams() {
    const diameters: IMobileFilterParams = {
      values: this.currentlyAvailableParams?.diameters ?? {},
      name: RimSpecifications.diameters,
      title: 'Диаметр',
    }
    const holeDiameters: IMobileFilterParams = {
      values: this.currentlyAvailableParams?.holeDiameters ?? {},
      name: RimSpecifications.holeDiameters,
      title: 'Диаметр расположенных отверстий',
    }
    const hubHoleDiameters: IMobileFilterParams = {
      values: this.currentlyAvailableParams?.hubHoleDiameters ?? {},
      name: RimSpecifications.hubHoleDiameters,
      title: 'Посадочный диаметр',
    }
    const mountHolesAmounts: IMobileFilterParams = {
      values: this.currentlyAvailableParams?.mountHolesAmounts ?? {},
      name: RimSpecifications.mountHolesAmounts,
      title: 'Количество крепежных отверстий',
    }
    const offsets: IMobileFilterParams = {
      values: this.currentlyAvailableParams?.offsets ?? {},
      name: RimSpecifications.offsets,
      title: 'Вылет',
    }
    // const widthParams = {
    //   values: this.currentlyAvailableParams?.widthParams ?? {},
    //   type: 'holeDiameters',
    //   title: 'Диаметр расположенных отверстий',
    // }

    return [diameters, holeDiameters, hubHoleDiameters, mountHolesAmounts, offsets /* widthParams */]
  }
}

export const quickChoiceByParamsStore = new QuickChoiceByParamsStore()
