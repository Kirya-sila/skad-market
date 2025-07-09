import { SpecifiedCarRimParamsRequest, SpecifiedCarRimParamsResponse } from '@entities/Rims/model/types'
import { httpClient } from '@shared/api/httpClient'
import { transformParamsToString } from '@shared/api/transformParamsToString'
import { apiRoutes } from '@/app-settings'
import { getUrlWithSearchParams } from '@/helpers'

export const fetchSpecifiedCarRimParams = async ({
  CarId,
  brand,
  model,
  ApplicabilityParam,
  InputRimParams,
}: SpecifiedCarRimParamsRequest): Promise<SpecifiedCarRimParamsResponse> => {
  const InputRimParamsString = InputRimParams ? transformParamsToString(InputRimParams, 'InputRimParams') : ''
  const baseUrlPart = getUrlWithSearchParams(apiRoutes.getSpecifiedCarRimParams, { CarId, brand, model })

  const params: SpecifiedCarRimParamsResponse = await httpClient(
    `${baseUrlPart}&ApplicabilityParam=${ApplicabilityParam}&${InputRimParamsString}`,
  )

  return params
}
