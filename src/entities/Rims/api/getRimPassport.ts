import { apiRoutes } from '@/app-settings'
import { httpClient } from '@/shared/api/httpClient'

export const getRimPassport = async (): Promise<BlobPart> => {
  const data = await httpClient(apiRoutes.getRimPassport)
  return data
}
