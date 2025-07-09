import { AvailableInputParams } from '@entities/Rims/model/types'

export const transformParamsToString = (inputParams: Partial<AvailableInputParams>, query: string): string => {
  let queryParams: string[] = []

  Object.keys(inputParams).forEach((key) => {
    const values = inputParams[key as keyof AvailableInputParams]
    if (Array.isArray(values)) {
      values.forEach((value) => {
        queryParams.push(`${query}.${key}=${encodeURIComponent(value)}`)
      })
    } else if (typeof values !== 'undefined' && values !== null) {
      queryParams.push(`${query}.${key}=${encodeURIComponent(values)}`)
    }
  })

  return queryParams.join('&')
}
