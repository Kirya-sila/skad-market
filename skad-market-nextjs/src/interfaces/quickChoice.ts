import { AvailableParam } from '@/entities/Rims/model/types'

export enum RimSpecifications {
  diameters = 'Diameters',
  hubHoleDiameters = 'HubHoleDiameters',
  holeDiameters = 'HoleDiameters',
  mountHolesAmounts = 'MountHolesAmounts',
  offsets = 'Offsets',
  // diskWidth = 'diskWidth',
  // mountHoleCount = 'mountHoleCount',
}

export type IRimSpecifications = Record<RimSpecifications, string | number>
export type IMobileRimSpecifications = Record<RimSpecifications, number[]>

export interface IMobileFilterParams {
  values: AvailableParam
  name: RimSpecifications
  title: string
}
