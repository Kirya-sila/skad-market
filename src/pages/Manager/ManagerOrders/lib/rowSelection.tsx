import { Button, Checkbox, Dropdown, Flex, MenuProps, TableProps } from 'antd'
import { DotsBurger } from '@/assets/icons'
import { sellerStore } from '@/entities/Seller/model/sellerStore'
import { IExpandedOrder } from '@/entities/Seller/model/types'

export const rowSelection = (
  items: MenuProps['items'],
  dropdownOpen: boolean,
  setDropdownOpen: (val: boolean) => void,
  allOrderIds: string[],
  selectedOrderIds: string[],
  selectOrderId: (value: string) => void,
  setSelectedAllOrderIds: () => void,
  clearSelectedOrderIds: () => void,
): TableProps<IExpandedOrder>['rowSelection'] => ({
  selectedRowKeys: selectedOrderIds,
  onSelectAll: (selected) => {
    if (selected) {
      setSelectedAllOrderIds()
    } else {
      clearSelectedOrderIds()
    }
  },
  onSelect: (record) => {
    selectOrderId(record.id)
  },
  columnTitle: () => (
    <Flex align='center'>
      <Dropdown
        menu={{ items, onMouseLeave: (): void => setDropdownOpen(false) }}
        trigger={['click']}
        open={dropdownOpen}
      >
        <Button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          type='text'
          size='small'
          style={{ padding: '0px 9px', borderRadius: 15 }}
        >
          <DotsBurger />
        </Button>
      </Dropdown>

      <Checkbox
        indeterminate={!!selectedOrderIds.length && selectedOrderIds.length !== allOrderIds.length}
        checked={selectedOrderIds.length === allOrderIds.length}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedAllOrderIds()
          } else {
            clearSelectedOrderIds()
          }
        }}
      />
    </Flex>
  ),
  renderCell: (checked, record, index, originNode) => originNode,
})
