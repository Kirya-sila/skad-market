import { AvailableFilter } from '@/entities/Rims/model/rimsStore'
import { RimFilter } from '@/entities/Rims/model/types'

export interface FilterProps {
  filter: AvailableFilter<keyof RimFilter>
}
