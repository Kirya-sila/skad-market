import { apiRoutes } from '@/app-settings'
import { IUserDeliveryItem } from '@/interfaces'
import { httpClient } from '@/shared/api/httpClient'
import { handleCatchedError } from '@/shared/libs'

export const getUserDeliveryItems = async (): Promise<IUserDeliveryItem[] | undefined> => {
  try {
    return await httpClient(apiRoutes.getAllDeliveryAddresses)
  } catch (e) {
    handleCatchedError(e)
  }
}
