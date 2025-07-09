import { ComponentType } from 'react'
import { Table as AntTable, TableProps } from 'antd'
import styled, { StyledComponent } from 'styled-components'
import { primaryDarkGray, primaryLightBlue, primaryWhite } from '@/theme'

const StyledTable = styled(AntTable)<{ userStyles: Record<string, unknown> }>(({ userStyles }) => ({
  width: '100%',
  '& .ant-table': {
    scrollbarWidth: 'thin',
    scrollbarColor: 'unset !important',
  },
  '&.ant-table-wrapper': {
    '& .ant-table-thead': {
      // '& .ant-table-cell': {
      //   textAlign: 'left',
      // },
      '> tr': {
        '> th': {
          background: primaryWhite,
          borderBottom: `1px solid ${primaryDarkGray}`,
        },
      },
    },

    '& .ant-table-tbody': {
      '> tr:last-child': {
        '> td': {
          borderBottom: `1px solid ${primaryDarkGray}`,
        },
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
  ...userStyles,
}))

export const Table = <T extends Record<keyof T, unknown>>({
  columns,
  dataSource,
  userStyles = {},
  scroll,
  ...rest
}: TableProps<T> & { userStyles?: Record<string, unknown> }) => {
  const handleChange: TableProps<T>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <StyledTable<StyledComponent<ComponentType, T>>
      {...rest}
      userStyles={userStyles}
      columns={columns}
      dataSource={dataSource}
      onChange={handleChange}
      showSorterTooltip={{ target: 'sorter-icon' }}
      scroll={scroll}
    />
  )
}
