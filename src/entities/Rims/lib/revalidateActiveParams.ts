import { ActiveParams, AvailableParam, AvailableParams, FilterName, ParameterGroups } from '@entities/Rims/model/types'

export const revalidateActiveParams = (availableParams: AvailableParams, activeParams: ActiveParams): ActiveParams => {
  const result = {} as ActiveParams

  for (const key in activeParams) {
    if (activeParams.hasOwnProperty(key) && availableParams.hasOwnProperty(key)) {
      const availableSubParams = availableParams[key as keyof AvailableParams]
      const activeSubParams = activeParams[key as keyof ActiveParams]

      if (availableSubParams && activeSubParams) {
        result[key as keyof ActiveParams] = {}

        for (const subKey in activeSubParams) {
          if (
            activeSubParams.hasOwnProperty(subKey) &&
            availableSubParams.hasOwnProperty(subKey) &&
            availableSubParams[subKey as keyof (AvailableParam | ParameterGroups)]
          ) {
            result[key as keyof ActiveParams]![subKey] = activeSubParams[subKey]
          }
        }
      }
    }
  }

  return result
}
