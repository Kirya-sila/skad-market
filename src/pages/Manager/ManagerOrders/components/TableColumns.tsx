import { FilterFilled } from '@ant-design/icons'
import { Checkbox, Flex, TableColumnsType } from 'antd'
import moment from 'moment'
import { findFilterNameByKey } from '@/entities/Seller/lib/findFilterNameByKey'
import { sellerStore } from '@/entities/Seller/model/sellerStore'
import { ExpandedOrderEnum, IExpandedOrder } from '@/entities/Seller/model/types'
import { RegularButton } from '@/shared/ui'

export const TableColumns = (): TableColumnsType<IExpandedOrder> => {
  const {
    hideOrderColumns,
    allFilterValues,
    setSelectedFilters,
    selectedFilters,
    getSellerOrders,
  } = sellerStore

  const arr = Object.keys(ExpandedOrderEnum).filter(
    (i) => !hideOrderColumns.includes(i as keyof IExpandedOrder),
  ) as Array<keyof typeof ExpandedOrderEnum>
  const result: TableColumnsType<IExpandedOrder> = arr.map((item) => {
    const filterValue = findFilterNameByKey(item)
    const column: TableColumnsType<IExpandedOrder>[0] = {
      title: ExpandedOrderEnum[item],
      dataIndex: item,
      sorter: true,
      minWidth: 150,
      filterIcon: () =>
        filterValue ? (
          <span>
            <FilterFilled />
          </span>
        ) : null,
      filterDropdown: () => {
        // if (!findFilterNameByKey(item)) return
        return (
          <Flex vertical={true} gap={24} style={{ fontSize: '16px', padding: '24px', width: '258px' }}>
            <Flex style={{ fontSize: '16px', fontWeight: '600' }}>{ExpandedOrderEnum[item]}</Flex>
            <Flex vertical={true}>
              {filterValue &&
                allFilterValues[filterValue]?.map((item) => {
                  const isSelected = selectedFilters[filterValue]?.includes(item)
                  return (
                    <Checkbox
                      checked={isSelected}
                      key={item}
                      onChange={() => setSelectedFilters(filterValue, item)}
                      style={{ borderRadius: '4px important' }}
                    >
                      {item}
                    </Checkbox>
                  )
                })}
            </Flex>
            <RegularButton
              onClick={() => {
                getSellerOrders()
              }}
              text={'Применить'}
              variant='filled'
              size='small'
            />
          </Flex>
        )
      },
    }
    if (item === 'createdAt') {
      column.render = (text: string) => (
        <div style={{ textAlign: 'right', lineHeight: '1.2' }}>
          <div>{moment(text).format('DD.MM.YYYY')}</div>
          <div>{moment(text).format('HH.mm')}</div>
        </div>
      )
    }
    if (item === 'productsEnumerationTitle') {
      column.minWidth = 240
    }
    if (item === 'responsibleManager') {
      column.render = (text: string | null) => <span>{text ? text : '-'}</span>
    }
    if (item === 'totalOrderCost') {
      column.render = (number: number) => <span>{number.toLocaleString()} ₽</span>
    }
    return column
  })
  return result
}
