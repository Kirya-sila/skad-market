import { ActiveFilterName, ResponseRimParams } from '@/entities/Rims/model/types'

export type AvailableCharacteristic =
  | ActiveFilterName
  | ResponseRimParams
  | 'DIA'
  | 'LZxPCD'
  | 'maxLoad'
  | 'formHoles'
  | 'holeDiametrUnderBolt'
  | 'holeDiametrUnderBalon'
  | 'brand'
  | 'weightNetto'
  | 'weightBrutto'
  | 'uniColor'
  | 'size'

