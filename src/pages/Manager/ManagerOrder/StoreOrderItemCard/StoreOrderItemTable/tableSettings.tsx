import { Flex, TableColumnsType } from 'antd'
import { IMappedStoreOrderItemTable, IStoreOrderItemTable } from '@/interfaces'
import { InfoText } from '@/shared/ui/TextFields'
import { primaryBlack, primaryDarkestGray, primaryGreen, primaryLightestGray } from '@/theme'

export const columns: TableColumnsType<IMappedStoreOrderItemTable> = [
  {
    title: 'Склад',
    dataIndex: 'warehouseTitle',
  },
  {
    title: 'На складе',
    dataIndex: 'totalAmountAtWarehouseStock',
    render: (value, record) => {
      const isSummary = !record.warehouseTitle
      const textStyles = isSummary
        ? { color: primaryBlack, fontWeight: 600 }
        : { color: primaryDarkestGray, fontWeight: 500 }
      return <InfoText style={textStyles}>{value}</InfoText>
    },
  },
  {
    title: 'Количество',
    dataIndex: 'reservedAmountAtWarehouse',
    render: (value, record) => {
      const isSummary = !record.warehouseTitle
      const textStyles = isSummary
        ? { color: primaryBlack, fontWeight: 600 }
        : { color: primaryDarkestGray, fontWeight: 500 }
      const blockStyles = !isSummary && {
        minWidth: '35px',
        padding: '0 8px',
        backgroundColor: record.warehouseTitle ? primaryLightestGray : 'unset',
        borderRadius: 8,
      }

      return (
        <Flex justify='flex-start'>
          <Flex style={blockStyles || {}}>
            <InfoText style={textStyles}>{value}</InfoText>
          </Flex>
        </Flex>
      )
    },
  },
  {
    title: 'Статус товара',
    dataIndex: 'reserveStatus',
    render: (value, record) => {
      const isSummary = !record.warehouseTitle
      if (isSummary) {
        return !record.totalReservedAmount ? (
          <InfoText style={{ color: primaryDarkestGray }}>Ожидает подтверждения резерва</InfoText>
        ) : null
      }
      return <InfoText style={{ color: value ? primaryGreen : primaryDarkestGray }}>{value || '-'}</InfoText>
    },
  },
]

export const mockData: IMappedStoreOrderItemTable[] = [
  {
    orderItemId: '1',
    reserveStatus: 'Зарезервировано',
    warehouseTitle: 'г. Москва, ул. Академика Коралева, д. 12, 27 этаж, офис 2034',
    totalAmountAtWarehouseStock: 6,
    reservedAmountAtWarehouse: 1,
  },
  {
    orderItemId: '2',
    reserveStatus: '-',
    warehouseTitle: 'г. Москва, ул. Академика Коралева, д. 12, 27 этаж, офис 2034',
    totalAmountAtWarehouseStock: 6,
    reservedAmountAtWarehouse: 1,
  },
  {
    orderItemId: '3',
    reserveStatus: 'Зарезервировано',
    warehouseTitle: 'г. Москва, ул. Академика Коралева, д. 12, 27 этаж, офис 2034',
    totalAmountAtWarehouseStock: 6,
    reservedAmountAtWarehouse: 1,
  },
  {
    orderItemId: '4',
    reserveStatus: '-',
    warehouseTitle: 'г. Москва, ул. Академика Коралева, д. 12, 27 этаж, офис 2034',
    totalAmountAtWarehouseStock: 6,
    reservedAmountAtWarehouse: 1,
  },
]
