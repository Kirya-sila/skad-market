import { ILocalType } from '../../interfaces'
import { localizeFilterName } from '@/entities/Rims/ui/FilterBar/utils'

export const localaziCharacteristic = (char: keyof ILocalType): string => {
  return localizeFilterName(char) || local[char] || char
}

const local: ILocalType = {
  // DIA: 'DIA',
  // LZxPCD: 'LZxPCD',
  // maxLoad: 'Максимальная нагрузка',
  // formHoles: 'Форма крепежных отверстий',
  // holeDiametrUnderBolt: 'Диаметр отверстия под болт/шпильку',
  // holeDiametrUnderBalon: 'Диаметр отверстия под балонник',
  // brand: 'Торговая марка',
  // uniColor: 'Унифицированный цвет',
  weightBrutto: 'Масса диска с упаковкой',
  lzxpcd: 'LZxPCD',
  sizeDesignation: 'Размер',
  diameter: 'Диаметр',
  hhDiameter: 'DIA',
  et: 'Вылет диска',
  lz: 'Количество крепежных отверстий',
  pcd: 'Диаметр расположения отверстий',
  rimWidth: 'Ширина',
  cylinderScrew: 'Форма крепежных отверстий',
  loadMax: 'Максимальная нагрузка',
  lz1_d1: 'Диаметр отверстия под болт/шпильку',
  lz1_d2: 'Диаметр отверстия под балонник',
  brandName: 'Торговая марка',
  clientWeight: 'Масса диска',
  colorName: 'Цвет производителя',
  colorNameUnique: 'Унифицированный цвет',
  applicability: 'Применимость',
}
