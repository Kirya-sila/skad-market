import { Button, TableColumnsType } from 'antd'
import { DotsBurger } from '@/assets/icons'
import { IBuyersTableData } from '@/interfaces'
import { BurgerComponent } from '@/shared/ui'
import { BuyersProperties } from '@/constants'
import { buyersBaseColumnSettings } from '../constants'

interface IColumnSettingsProps {
  visibleColumns: BuyersProperties[]
  handleColumns: (value: BuyersProperties) => void
}

export const columns = ({
  visibleColumns,
  handleColumns,
}: IColumnSettingsProps): TableColumnsType<IBuyersTableData> => [
  {
    title: (
      <BurgerComponent
        visibleColumns={visibleColumns}
        handleColumn={handleColumns}
        baseColumnsSettings={buyersBaseColumnSettings}
      />
    ),
    dataIndex: 'dots',
    align: 'center',
    width: 20,
  },
  {
    title: 'Фамилия, имя',
    dataIndex: 'fullName',
    onFilter: (value, record) => record.fullName.indexOf(value as string) === 0,
    sorter: (a, b) => a.fullName.length - b.fullName.length,
    // sortDirections: ['descend'],
    showSorterTooltip: { target: 'full-header' },
    hidden: !visibleColumns.includes(BuyersProperties.fullName),
  },

  {
    title: 'Телефон',
    dataIndex: 'phoneNumber',
    sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
    showSorterTooltip: { target: 'full-header' },
    hidden: !visibleColumns.includes(BuyersProperties.phoneNumber),
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.email.length - b.email.length,
    showSorterTooltip: { target: 'full-header' },
    hidden: !visibleColumns.includes(BuyersProperties.email),
  },
]

export const mockData: IBuyersTableData[] = [
  {
    id: '1',
    fullName: 'Ivan Ivanov',
    phoneNumber: '+7222222222',
    email: 'admin@admin.com',
  },
  {
    id: '2',
    fullName: 'Petr Petrov',
    phoneNumber: '+7222222222',
    email: 'admin1@admin.com',
  },
  {
    id: '3',
    fullName: 'Artem Sidorov',
    phoneNumber: '+7222222222',
    email: 'admin2@admin.com',
  },
]
