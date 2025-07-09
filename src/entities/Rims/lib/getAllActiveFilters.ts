import { ActiveFilter, ActiveFilterName, ActiveParams } from '@entities/Rims/model/types'

export const getAllActiveFilters = (params: ActiveParams, ignored: ActiveFilterName[] = []): ActiveFilter[] =>
  Object.entries(params)
    .map(([name, values]) => ({
      name,
      values: Object.keys(values).filter((key) => values[key]),
    }))
    .filter(
      (filter) => !ignored.includes(filter.name as ActiveFilterName) && filter.values.length > 0,
    ) as ActiveFilter[]
