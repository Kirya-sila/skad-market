import { IMappedStoreOrderItemTable, IOrderStoreData, IStoreOrderItemTable } from '@/interfaces'
import { v4 } from 'uuid'

export const mapManagerOrderWarehouseTableData = (data: IOrderStoreData) => {
  const reservationData: IMappedStoreOrderItemTable[] = JSON.parse(JSON.stringify(data.reservationData))
  let reservedAmount = 0

  const totalAmountAtWarehouseStock = data.reservationData.reduce((summ, item) => {
    reservedAmount += item.reservedAmountAtWarehouse
    return (summ += item.totalAmountAtWarehouseStock)
  }, 0)

  reservationData.push({
    orderItemId: v4(),
    totalAmountAtWarehouseStock,
    totalReservedAmount: reservedAmount,
    reservedAmountAtWarehouse: `${reservedAmount} из ${totalAmountAtWarehouseStock}`,
  })

  return reservationData
}
