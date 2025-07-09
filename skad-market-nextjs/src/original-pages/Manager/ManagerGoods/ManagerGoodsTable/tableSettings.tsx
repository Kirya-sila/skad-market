import { Flex, TableColumnsType } from 'antd'
import { IGoodsData } from '@/interfaces'
import { SectionTitle } from '@/shared/ui'
import { CharachteristicAvailability, GoodsProperties } from '@/constants'
import { GoodsStatus } from './GoodsStatus'
import { GoodsStatus as GoodsStatusEnum } from '@/constants'
import { baseColumnsSettings } from '../constants'
import { ImageLoader } from '@/shared/ui/ImageLoader'
import moment from 'moment'
import { primaryBlack, primaryBlue, primaryDarkGray, primaryRed } from '@/theme'
import { ColumnType } from 'antd/es/table'
import { BurgerComponent } from '../../../../shared/ui/BurgerComponent/BurgerComponent'
import ProductCardImage3 from '@assets/images/product_card_image_3.png'

const getCellItemStyles = (itemsAmount: IGoodsData[GoodsProperties.itemsAmount]) => ({
  color: itemsAmount ? primaryBlack : primaryDarkGray,
})

const burgerColumn = (
  visibleColumns: GoodsProperties[],
  handleColumns: (value: GoodsProperties) => void,
): TableColumnsType<IGoodsData>[number] => {
  return {
    title: (
      <BurgerComponent
        visibleColumns={visibleColumns}
        handleColumn={handleColumns}
        baseColumnsSettings={baseColumnsSettings}
      />
    ),
    dataIndex: 'dots',
    align: 'center',
    width: 20,
  }
}

const columnsArray: [GoodsProperties, ColumnType<IGoodsData>][] = Object.entries(baseColumnsSettings).map(
  ([key, object]) => {
    switch (key) {
      case GoodsProperties.status: {
        return [key, { ...object, render: (value: GoodsStatusEnum) => <GoodsStatus status={value} /> }]
      }
      case GoodsProperties.img: {
        return [
          key,
          {
            ...object,
            render: (value: IGoodsData[GoodsProperties.img]) => (
              <ImageLoader style={{ width: 32, height: 30 }} src={value} />
            ),
          },
        ]
      }
      case GoodsProperties.updatedAt: {
        return [
          key,
          {
            ...object,
            render: (value: IGoodsData[GoodsProperties.updatedAt], record) => (
              <Flex style={getCellItemStyles(record.itemsAmount)}>{moment(value).format('DD.MM.YYYY')}</Flex>
            ),
          },
        ]
      }
      case GoodsProperties.ourCost: {
        return [
          key,
          {
            ...object,
            render: (value: IGoodsData[GoodsProperties.ourCost], record) => (
              <Flex style={getCellItemStyles(record.itemsAmount)}>{value} ₽</Flex>
            ),
          },
        ]
      }
      case GoodsProperties.buyerCost: {
        return [
          key,
          {
            ...object,
            render: (value: IGoodsData[GoodsProperties.buyerCost], record) => (
              <Flex style={getCellItemStyles(record.itemsAmount)}>{value} ₽</Flex>
            ),
          },
        ]
      }
      case GoodsProperties.itemsAmount: {
        return [
          key,
          {
            ...object,
            render: (value: IGoodsData[GoodsProperties.itemsAmount]) => (
              <SectionTitle style={{ color: !value ? primaryRed : primaryBlue }}>{value}</SectionTitle>
            ),
          },
        ]
      }
      default: {
        return [
          key as GoodsProperties,
          {
            ...object,
            render: (value: IGoodsData[GoodsProperties], record: IGoodsData) => (
              <Flex style={getCellItemStyles(record.itemsAmount)}>{value}</Flex>
            ),
          },
        ]
      }
    }
  },
)

export const getColumns = (visibleColumns: GoodsProperties[] = [], handleColumns: (value: GoodsProperties) => void) => {
  const columns = columnsArray.map(([_, obj]) => ({
    ...obj,
    hidden: !visibleColumns.includes(obj.key as GoodsProperties),
  }))

  return [burgerColumn(visibleColumns, handleColumns), ...columns]
}

export const mockData: IGoodsData[] = [
  {
    id: '1',
    [GoodsProperties.status]: GoodsStatusEnum.notAvailable,
    [GoodsProperties.img]: ProductCardImage3,
    [GoodsProperties.productsEnumerationTitle]: 'Title',
    [GoodsProperties.updatedAt]: '2024-12-11T11:28:04.2152017',
    [GoodsProperties.internalNumber]: '21412312321',
    [GoodsProperties.ourCost]: '12500',
    [GoodsProperties.buyerCost]: '14000',
    [GoodsProperties.itemsAmount]: 0,
    [GoodsProperties.width]: 31,
    [GoodsProperties.profile]: 35,
    [GoodsProperties.diameter]: 'R17',
    [GoodsProperties.season]: 'Лето',
    [GoodsProperties.spikes]: 'Без шипов',
    [GoodsProperties.spikesType]: '-',
    [GoodsProperties.speedIndex]: 'H (до 210 км/ч)',
    [GoodsProperties.loadIndex]: 122,
    [GoodsProperties.runFlat]: CharachteristicAvailability.no,
    [GoodsProperties.construction]: 'Радиальный',
    [GoodsProperties.sealingMethod]: 'Бескамерные',
    [GoodsProperties.profileType]: 'Низкопрофильные',
    [GoodsProperties.treadPattern]: 'Симметрично-направленный',
    [GoodsProperties.bumpStop]: CharachteristicAvailability.yes,
    [GoodsProperties.extraLoad]: CharachteristicAvailability.yes,
    [GoodsProperties.country]: 'Япония',
    [GoodsProperties.weight]: 55,
    [GoodsProperties.brandName]: 'Rays Homura',
  },
  {
    id: '2',
    [GoodsProperties.status]: GoodsStatusEnum.available,
    [GoodsProperties.img]: ProductCardImage3,
    [GoodsProperties.productsEnumerationTitle]: 'Title',
    [GoodsProperties.updatedAt]: '2024-12-11T11:28:04.2152017',
    [GoodsProperties.internalNumber]: '21412312321',
    [GoodsProperties.ourCost]: '12500',
    [GoodsProperties.buyerCost]: '14000',
    [GoodsProperties.itemsAmount]: 5,
    [GoodsProperties.width]: 31,
    [GoodsProperties.profile]: 35,
    [GoodsProperties.diameter]: 'R17',
    [GoodsProperties.season]: 'Лето',
    [GoodsProperties.spikes]: 'Без шипов',
    [GoodsProperties.spikesType]: '-',
    [GoodsProperties.speedIndex]: 'H (до 210 км/ч)',
    [GoodsProperties.loadIndex]: 122,
    [GoodsProperties.runFlat]: CharachteristicAvailability.no,
    [GoodsProperties.construction]: 'Радиальный',
    [GoodsProperties.sealingMethod]: 'Бескамерные',
    [GoodsProperties.profileType]: 'Низкопрофильные',
    [GoodsProperties.treadPattern]: 'Симметрично-направленный',
    [GoodsProperties.bumpStop]: CharachteristicAvailability.yes,
    [GoodsProperties.extraLoad]: CharachteristicAvailability.yes,
    [GoodsProperties.country]: 'Япония',
    [GoodsProperties.weight]: 55,
    [GoodsProperties.brandName]: 'Rays Homura',
  },
  {
    id: '3',
    [GoodsProperties.status]: GoodsStatusEnum.discontinued,
    [GoodsProperties.img]: ProductCardImage3,
    [GoodsProperties.productsEnumerationTitle]: 'Title',
    [GoodsProperties.updatedAt]: '2024-12-11T11:28:04.2152017',
    [GoodsProperties.internalNumber]: '21412312321',
    [GoodsProperties.ourCost]: '12500',
    [GoodsProperties.buyerCost]: '14000',
    [GoodsProperties.itemsAmount]: 0,
    [GoodsProperties.width]: 31,
    [GoodsProperties.profile]: 35,
    [GoodsProperties.diameter]: 'R17',
    [GoodsProperties.season]: 'Лето',
    [GoodsProperties.spikes]: 'Без шипов',
    [GoodsProperties.spikesType]: '-',
    [GoodsProperties.speedIndex]: 'H (до 210 км/ч)',
    [GoodsProperties.loadIndex]: 122,
    [GoodsProperties.runFlat]: CharachteristicAvailability.no,
    [GoodsProperties.construction]: 'Радиальный',
    [GoodsProperties.sealingMethod]: 'Бескамерные',
    [GoodsProperties.profileType]: 'Низкопрофильные',
    [GoodsProperties.treadPattern]: 'Симметрично-направленный',
    [GoodsProperties.bumpStop]: CharachteristicAvailability.yes,
    [GoodsProperties.extraLoad]: CharachteristicAvailability.yes,
    [GoodsProperties.country]: 'Япония',
    [GoodsProperties.weight]: 55,
    [GoodsProperties.brandName]: 'Rays Homura',
  },
]
