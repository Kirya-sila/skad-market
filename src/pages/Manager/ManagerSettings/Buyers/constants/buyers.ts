import { BuyersProperties } from '@/constants'
import { IBuyersTableData } from '@/interfaces'
import { ColumnType } from 'antd/es/table'

export const buyersBaseColumnSettings: Record<BuyersProperties, ColumnType<IBuyersTableData>> = {
  [BuyersProperties.fullName]: {
    title: 'Фамилия, имя',
    dataIndex: BuyersProperties.fullName,
    key: BuyersProperties.fullName,
  },
  [BuyersProperties.email]: {
    title: 'E-mail',
    dataIndex: BuyersProperties.email,
    key: BuyersProperties.email,
  },
  [BuyersProperties.phoneNumber]: {
    title: 'Телефон',
    dataIndex: BuyersProperties.phoneNumber,
    key: BuyersProperties.phoneNumber,
  },
}
