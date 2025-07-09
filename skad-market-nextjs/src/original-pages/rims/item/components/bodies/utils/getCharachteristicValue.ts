import { ApplicabilityParams, Params } from '@/constants'
import { RimDTO } from '@/entities/Rims/model/types'
import { ILocalType } from '@/pages/rims'

export const getCharacteristicValue = (rim: Omit<RimDTO, 'images'>, fieldName: keyof ILocalType) => {
  switch (fieldName) {
    case 'lzxpcd':
      return `${rim.lz}x${rim.pcd}`
    case 'weightBrutto': {
      if (rim.clientWeight && rim.boxWeight) {
        return `${(rim.clientWeight + rim.boxWeight).toFixed(2)} кг`
      } else return undefined
    }
    case 'loadMax':
    case 'clientWeight':
      return `${rim[fieldName]} кг`
    case 'applicability':
      return ApplicabilityParams[rim[fieldName] as Params]
    default:
      return rim[fieldName]
  }
}
