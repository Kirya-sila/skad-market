import { FC, useState } from 'react'
import { Checkbox, MenuProps, Switch, TablePaginationConfig, TableProps } from 'antd'
import { generatePath, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import styles from './OrdersTable.module.scss'
import { sellerStore } from '@/entities/Seller/model/sellerStore'
import { ExpandedOrderEnum, IExpandedOrder } from '@/entities/Seller/model/types'
import { Table } from '@/shared/ui'
import { appRoutes } from '@/app-settings'
import { findClassName, rowSelection } from '../lib'
import { TableColumns } from '../components'

interface OrdersTableProps {
  orders: IExpandedOrder[]
  loading: boolean
}

export const OrdersTable: FC<OrdersTableProps> = observer(({ orders, loading }) => {
  const navigate = useNavigate()
  const {
    hideOrderColumns,
    changeHideOrderColumns,
    allOrderIds,
    selectedOrderIds,
    selectOrderId,
    setSelectedAllOrderIds,
    clearSelectedOrderIds,
    chunkSize,
    setPageNumber,
    totalNumber,
    getSellerOrders,
    chunkNumber,
  } = sellerStore

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const columnNames = Object.keys(ExpandedOrderEnum) as (keyof typeof ExpandedOrderEnum)[]

  const itemsForDropdown = columnNames.map((item) => {
    return {
      label: (
        <div key={item} className={styles.dropdownItem} onClick={() => changeHideOrderColumns(item)}>
          <div>{ExpandedOrderEnum[item]}</div>
          <Switch
            checked={!hideOrderColumns.includes(item as keyof IExpandedOrder)}
            // onChange={(checked) => {
            //   changeHideOrderColumns(item)
            // }}
          />
        </div>
      ),
      key: item,
    }
  })

  const handlePagination = async (page: number) => {
    setPageNumber(page)
    await getSellerOrders()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const items: MenuProps['items'] = [
    { label: <div className={styles.dropdownTitle}>Видимость столбцов</div>, key: 0 },
    ...itemsForDropdown,
  ]

  const rowSelectionObj = rowSelection(
    items,
    dropdownOpen,
    setDropdownOpen,
    allOrderIds,
    selectedOrderIds,
    selectOrderId,
    setSelectedAllOrderIds,
    clearSelectedOrderIds,
  )

  return (
    <Table
      className={styles.antdTable}
      columns={TableColumns()}
      dataSource={orders}
      rowKey='id'
      pagination={{
        size: 'small',
        current: chunkNumber,
        pageSize: chunkSize,
        total: totalNumber,
        showSizeChanger: false,
        onChange: handlePagination,
      }}
      rowClassName={(record) => {
        const param = findClassName(record.status)

        return styles[param]
      }}
      rowHoverable
      rowSelection={{ type: 'checkbox', ...rowSelectionObj }}
      scroll={{ x: 1440 }}
      locale={{
        triggerDesc: 'Сортировать по уменьшению',
        triggerAsc: 'Сортировать по увеличению',
        cancelSort: 'Отменить сортировку',
      }}
      onRow={(record) => {
        return {
          onClick: () => navigate(generatePath(appRoutes.manager.orders.orderItem, { orderId: record.id })),
        }
      }}
      loading={loading}
    />
  )
})
