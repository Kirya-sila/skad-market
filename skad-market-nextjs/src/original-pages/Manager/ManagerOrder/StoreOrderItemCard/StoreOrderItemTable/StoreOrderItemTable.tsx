import { ComponentType } from 'react'
import { Table as AntTable, TableProps } from 'antd'
import styled, { StyledComponent } from 'styled-components'
import { primaryLightGray, primaryLightBlue, primaryWhite } from '@/theme'

const StyledTable = styled(AntTable)({
  width: '100%',
  '&.ant-table-wrapper': {
    '& .ant-table-thead': {
      '> tr': {
        '> th': {
          ':not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before': {
            width: 0,
          },
          background: primaryWhite,
          borderBottom: `1px solid ${primaryLightGray}`,
          padding: '16px',
          ':first-child': {
            paddingLeft: 0,
          },
        },
      },
    },

    '& .ant-table-tbody': {
      '> tr': {
        '> td': {
          border: 'none',
          ':first-child': {
            paddingLeft: 0,
          },
        },
      },
      '> tr:last-child': {
        '> td': {
          borderBottom: `1px solid ${primaryLightGray}`,
          borderTop: `1px solid ${primaryLightGray}`,
        },
      },
      '& .ant-table-cell': {
        padding: '8px 16px',
      },
    },
  },
  '& .ant-pagination': {
    '.ant-pagination-item': {
      borderRadius: 0,
    },
    '.ant-pagination-item-active': {
      border: 'unset',
      borderBottom: `2px solid ${primaryLightBlue}`,
    },
  },
})

export const StoreOrderItemTable = <T extends Partial<Record<keyof T, unknown>>>({
  columns,
  dataSource,
  ...rest
}: TableProps<T>) => {
  // const onChange: TableProps<T>['onChange'] = (pagination, filters, sorter, extra) => {
  //   console.log('params', pagination, filters, sorter, extra)
  // }

  return (
    <StyledTable<StyledComponent<ComponentType, T>>
      {...rest}
      columns={columns}
      dataSource={dataSource}
      // onChange={onChange}
      pagination={false}
    />
  )
}
