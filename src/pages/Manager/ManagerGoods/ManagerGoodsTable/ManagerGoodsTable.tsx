import { GoodsProperties } from '@/constants'
import { IGoodsData } from '@/interfaces'
import { useVisibleColumns } from '@/shared/libs'
import { Table } from '@/shared/ui'
import { getColumns } from './tableSettings'

export const ManagerGoodsTable = () => {
  const [visibleColumns, handleColumns] = useVisibleColumns<GoodsProperties>(GoodsProperties)

  return (
    <Table<IGoodsData>
      columns={getColumns(visibleColumns, handleColumns)}
      dataSource={/* mockData */ []}
      rowKey='id'
      scroll={{ x: 'max-content' }}
      pagination={{ size: 'small' }}
    />
  )
}
