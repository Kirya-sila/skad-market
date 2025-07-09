import { GoodsProperties } from '@/constants'
import { IGoodsData } from '@/interfaces'
import { ColumnType } from 'antd/es/table'

export const baseColumnsSettings: Record<
  GoodsProperties,
  ColumnType<IGoodsData>
> = {
  [GoodsProperties.status]: { title: 'Статус', dataIndex: GoodsProperties.status, key: GoodsProperties.status },
  [GoodsProperties.img]: { title: 'Фото', dataIndex: GoodsProperties.img, key: GoodsProperties.img },
  [GoodsProperties.productsEnumerationTitle]: {
    title: 'Наименование товара',
    dataIndex: GoodsProperties.productsEnumerationTitle,
    key: GoodsProperties.productsEnumerationTitle,
  },
  [GoodsProperties.updatedAt]: {
    title: 'Дата обновления',
    dataIndex: GoodsProperties.updatedAt,
    key: GoodsProperties.updatedAt,
  },
  [GoodsProperties.internalNumber]: {
    title: 'Артикул',
    dataIndex: GoodsProperties.internalNumber,
    key: GoodsProperties.internalNumber,
  },
  [GoodsProperties.ourCost]: { title: 'Ваша цена', dataIndex: GoodsProperties.ourCost, key: GoodsProperties.ourCost },
  [GoodsProperties.buyerCost]: {
    title: 'Цена для покупателя',
    dataIndex: GoodsProperties.buyerCost,
    key: GoodsProperties.buyerCost,
  },
  [GoodsProperties.itemsAmount]: {
    title: 'Остаток',
    dataIndex: GoodsProperties.itemsAmount,
    key: GoodsProperties.itemsAmount,
  },
  [GoodsProperties.width]: { title: 'Ширина', dataIndex: GoodsProperties.width, key: GoodsProperties.width },
  [GoodsProperties.profile]: { title: 'Профиль', dataIndex: GoodsProperties.profile, key: GoodsProperties.profile },
  [GoodsProperties.diameter]: { title: 'Диаметр', dataIndex: GoodsProperties.diameter, key: GoodsProperties.diameter },
  [GoodsProperties.season]: { title: 'Сезонность', dataIndex: GoodsProperties.season, key: GoodsProperties.season },
  [GoodsProperties.spikes]: { title: 'Шипы', dataIndex: GoodsProperties.spikes, key: GoodsProperties.spikes },
  [GoodsProperties.spikesType]: {
    title: 'Тип шипов',
    dataIndex: GoodsProperties.spikesType,
    key: GoodsProperties.spikesType,
  },
  [GoodsProperties.speedIndex]: {
    title: 'Индекс скорости',
    dataIndex: GoodsProperties.speedIndex,
    key: GoodsProperties.speedIndex,
  },
  [GoodsProperties.loadIndex]: {
    title: 'Индекс нагрузки',
    dataIndex: GoodsProperties.loadIndex,
    key: GoodsProperties.loadIndex,
  },
  [GoodsProperties.runFlat]: { title: 'RunFlat', dataIndex: GoodsProperties.runFlat, key: GoodsProperties.runFlat },
  [GoodsProperties.construction]: {
    title: 'Тип конструкции',
    dataIndex: GoodsProperties.construction,
    key: GoodsProperties.construction,
  },
  [GoodsProperties.sealingMethod]: {
    title: 'Способ герметизации',
    dataIndex: GoodsProperties.sealingMethod,
    key: GoodsProperties.sealingMethod,
  },
  [GoodsProperties.profileType]: {
    title: 'Тип профиля',
    dataIndex: GoodsProperties.profileType,
    key: GoodsProperties.profileType,
  },
  [GoodsProperties.treadPattern]: {
    title: 'Рисунок протектора',
    dataIndex: GoodsProperties.treadPattern,
    key: GoodsProperties.treadPattern,
  },
  [GoodsProperties.bumpStop]: {
    title: 'Наличие отбойника',
    dataIndex: GoodsProperties.bumpStop,
    key: GoodsProperties.bumpStop,
  },
  [GoodsProperties.extraLoad]: {
    title: 'Extra Load',
    dataIndex: GoodsProperties.extraLoad,
    key: GoodsProperties.extraLoad,
  },
  [GoodsProperties.country]: {
    title: 'Страна изготовитель',
    dataIndex: GoodsProperties.country,
    key: GoodsProperties.country,
  },
  [GoodsProperties.weight]: {
    title: 'Объемный вес, кг',
    dataIndex: GoodsProperties.weight,
    key: GoodsProperties.weight,
  },
  [GoodsProperties.brandName]: {
    title: 'Бренд',
    dataIndex: GoodsProperties.brandName,
    key: GoodsProperties.brandName,
  },
}
