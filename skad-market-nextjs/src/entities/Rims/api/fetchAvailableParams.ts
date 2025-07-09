import { AvailableParams, AvailableParamsRequest } from '@entities/Rims/model/types'
import { httpClient } from '@shared/api/httpClient'
import { transformParamsToString } from '@shared/api/transformParamsToString'
import { apiRoutes } from '@/app-settings'
import { getUrlWithSearchParams } from '@/helpers'

export const fetchAvailableParams = async ({
  isInputParamsIncluded,
  inputParams,
  modelParams,
}: AvailableParamsRequest): Promise<AvailableParams> => {
  const inputParamsString = inputParams ? transformParamsToString(inputParams, 'InputRimParams') : ''

  const path = getUrlWithSearchParams(apiRoutes.availableParams, {
    ...modelParams,
    IsInputParamsIncluded: isInputParamsIncluded.toString(),
  })

  const params: AvailableParams = await httpClient(`${path}&${inputParamsString}`)

  return params
}
