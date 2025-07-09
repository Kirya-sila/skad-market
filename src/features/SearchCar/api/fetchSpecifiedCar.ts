import { CarData, SpecifiedCarRequest } from '@/features/SearchCar/model/types'
import { httpClient } from '@shared/api/httpClient'

const defaultParams = {
  // Brand: 'null',
  // Model: 'null',
  // BeginVIP: 'null',
  // EndVIP: 'null',
  // BodyType: 'null',
  // BodyDefenitionId: 'null',
  // BodyDefenition: 'null',
  // DoorsAmount: 'null'
  CarId: 'null',
}

export const fetchSpecifiedCar = async (params: Partial<SpecifiedCarRequest>): Promise<CarData> => {
  const finalParams = { ...defaultParams, ...params }

  const queryParams = new URLSearchParams(
    Object.entries(finalParams).reduce(
      (acc, [key, value]) => {
        acc[key] = value === '' ? 'null' : String(value)
        return acc
      },
      {} as Record<string, string>,
    ),
  ).toString()

  return await httpClient(`/car-selection/specified-car?${queryParams}`)
}
