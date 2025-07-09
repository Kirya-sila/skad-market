import { columns } from './tableSettings'
import { IOrderChangesHistory } from '@/interfaces'
import { Table } from '@/shared/ui'
import { FC } from 'react'

export const HistoryTable: FC<{ orderChangesHistory: IOrderChangesHistory[] }> = ({ orderChangesHistory }) => {
  return (
    <Table<IOrderChangesHistory>
      columns={columns}
      dataSource={orderChangesHistory}
      rowKey='createdAt'
      pagination={false}
      scroll={orderChangesHistory.length > 10 ? { y: 48 * 10 } : undefined}
      userStyles={{
        '&.ant-table-wrapper': {
          '& .ant-table-tbody': {
            '>tr>td': {
              paddingTop: 12,
              paddingBottom: 12,
            },
            '>tr:last-child >td': {
              borderBottom: `1px solid #f0f0f0`,
            },
          },
          '& .ant-table': {
            scrollbarColor: 'unset',
          },
        },
        '& .ant-table-thead >tr>th': {
          padding: '12px 10px',
        },
      }}
    />
  )
}
