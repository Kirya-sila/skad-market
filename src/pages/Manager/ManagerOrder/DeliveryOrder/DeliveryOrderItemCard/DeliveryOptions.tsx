import { FC, useState } from 'react'
import { DatePickerProps, Flex } from 'antd'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { managersOrderStore, setPlanningShipmentDate } from '@/features/manager'
import { IOrderDeliveryTabData } from '@/interfaces'
import { handleCatchedError } from '@/shared/libs'
import { DatePicker, SelectWithLabel } from '@/shared/ui'
import { Spinner } from '@/shared/ui/Spinner'

export const DeliveryOptions: FC<{ data: IOrderDeliveryTabData }> = observer(({ data }) => {
  const { orderId = '' } = useParams()
  const { setPlaningShipmentDateLoading, planingShipmentDateLoading } = managersOrderStore
  const [shippmentDate, setShippmentDate] = useState(data.planningShipmentDate)

  const onShipmentDateChange: DatePickerProps['onChange'] = async (date: dayjs.Dayjs | undefined) => {
    const prevShippmentDate = shippmentDate
    if (date) {
      setShippmentDate(date.toDate())
      const isoDate = new Date(date.format('YYYY-MM-DD')).toISOString()
      setPlaningShipmentDateLoading(true)
      try {
        await setPlanningShipmentDate({ orderId, planningShipmentDate: isoDate })      
        // this.getManagersOrder(orderId)
      } catch (e) {
        setShippmentDate(prevShippmentDate)
        handleCatchedError(e)
      } finally {
        setPlaningShipmentDateLoading(false)
      }
    }
  }

  const disableHolidays = (date: dayjs.Dayjs) => {
    return date.day() === 0 || date.day() === 6
  }

  return (
    <Flex gap={20} style={{ marginTop: 16 }}>
      <SelectWithLabel
        style={{ width: '100%' }}
        size='small'
        items={[{ item: 'DPD', value: 'dpd' }]}
        label='Способ доставки'
        disabled={true}
        value={data.deliveryMethod}
      />
      <SelectWithLabel
        style={{ width: '100%' }}
        size='small'
        items={[{ item: 'DPD', value: 'dpd' }]}
        label='Тариф доставки'
        disabled={true}
        value={data.deliveryRate}
      />
      <DatePicker
        style={{ width: '100%' }}
        size='small'
        label='Плановая дата отгрузки'
        minDate={dayjs(Date.now())}
        value={dayjs(new Date(shippmentDate))}
        onChange={onShipmentDateChange}
        disabledDate={disableHolidays}
        disabled={planingShipmentDateLoading}
        autoFocus={false}
        suffixIcon={
          planingShipmentDateLoading && (
            <Flex style={{ width: 20, height: 20 }}>
              <Spinner />
            </Flex>
          )
        }
      />
      {/* <Flex vertical gap={14}>
        <Typography.Text
          style={{ color: primaryBlack, fontSize: 12, lineHeight: '16px', whiteSpace: 'nowrap', fontWeight: 600 }}
        >
          Плановая дата доставки
        </Typography.Text>
        <Typography.Text style={{ color: primaryDarkGray, fontSize: 12, lineHeight: '16px' }}>
          {data.planningDeliveryDate ? moment(data.planningDeliveryDate).format('DD-MM-YYYY') : 'Нет данных'}
        </Typography.Text>
      </Flex> */}
    </Flex>
  )
})
