import { RimDTO } from '@/entities/Rims/model/types'

export interface ILocalType extends PartialRecord<(keyof Omit<RimDTO, 'images'>), string> {
  lzxpcd: string
  weightBrutto: string
}
