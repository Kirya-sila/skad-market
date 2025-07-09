import { employeesStore } from '@/features/manager'
import { columns, mockData } from './tableSettings'
import { BuyersProperties } from '@/constants'
import { IBuyersTableData } from '@/interfaces'
import { useVisibleColumns } from '@/shared/libs'
import { Table } from '@/shared/ui'

export const BuyersTable = () => {
  const [visibleColumns, handleColumns] = useVisibleColumns<BuyersProperties>(BuyersProperties)
  const { employees } = employeesStore

  return (
    <Table<IBuyersTableData>
      columns={columns({ visibleColumns, handleColumns })}
      dataSource={mockData}
      rowKey='id'
      pagination={{ size: 'small' }}
    />
  )
}
