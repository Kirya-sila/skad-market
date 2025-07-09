import { FC, useState } from 'react'
import { Button, Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { StoreOrderItem } from './StoreOrderItem'
import { StoreOrderItemTable, columns } from './StoreOrderItemTable'
import { EditIcon } from '@/assets/icons'
import { managersOrderStore } from '@/features/manager'
import { mapManagerOrderWarehouseTableData } from '@/helpers'
import { IManagersOrderData, IMappedStoreOrderItemTable, IOrderStoreData, OrderStatus } from '@/interfaces'
import { InfoText, InfoTitle } from '@/shared/ui/TextFields'
import { primaryBlue, primaryWhite } from '@/theme'
import { TrackNumber } from '@/widgets'

interface IStoreOrderItemCard {
  data: IOrderStoreData
  trackNumber: IManagersOrderData['order']['trackingNumber']
}

export const StoreOrderItemCard: FC<IStoreOrderItemCard> = observer(({ data, trackNumber }) => {
  const {
    orderStatusInfo: { status },
  } = managersOrderStore
  const [editableStr, setEditableStr] = useState(data.retailPrice?.toString() ?? '')

  // const handleEdit = (value: string) => {
  //   setEditableStr(value)
  // }

  return (
    <Flex vertical style={{ padding: 24, backgroundColor: primaryWhite, borderRadius: 10 }}>
      <StoreOrderItem data={data} />
      <StoreOrderItemTable<IMappedStoreOrderItemTable>
        columns={columns}
        dataSource={mapManagerOrderWarehouseTableData(data)}
      />
      <Flex vertical align='flex-start' style={{ flexGrow: 1 }}>
        <Flex justify='space-between' style={{ marginTop: 16, width: '100%' }}>
          <Flex gap={8} align='center'>
            <Flex gap={8}>
              <Flex align='center' gap={4}>
                <InfoTitle>Цена за единицу:</InfoTitle>
                {status !== OrderStatus.canceled ? (
                  // <EditableTextField onChange={handleEdit}>{editableStr || '0'} ₽</EditableTextField>
                  <InfoText>{data.retailPrice ?? '0'} ₽</InfoText>
                ) : (
                  <InfoText>{data.retailPrice ?? '0'} ₽</InfoText>
                )}
              </Flex>
              <Flex style={{ width: 14 }} align='center'>
                <EditIcon color={primaryBlue} />
              </Flex>
            </Flex>
          </Flex>
          <Flex align='center' gap={4}>
            <InfoTitle>Стоимость:</InfoTitle>
            <InfoText>{Number(editableStr) * data.itemsAmount} ₽</InfoText>
          </Flex>
          {status !== OrderStatus.canceled && (
            <Button variant='text' color='danger'>
              Отменить товар
            </Button>
          )}
        </Flex>
        {!!trackNumber && <TrackNumber trackNumber={trackNumber} />}
      </Flex>
    </Flex>
  )
})
