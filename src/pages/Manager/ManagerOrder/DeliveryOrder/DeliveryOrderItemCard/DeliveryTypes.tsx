import { useState } from 'react'
import { Flex, Radio, RadioChangeEvent } from 'antd'
import { DeliveryTypes as Types } from '@/constants'
import { AntRadio, SectionTitle } from '@/shared/ui'

// interface IDeliveryTypes {}

export const DeliveryTypes = () => {
  const [value, setValue] = useState(Types.storeStore)

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
  }

  return (
    <Flex gap={8} align='center'>
      <SectionTitle>Тип доставки:</SectionTitle>
      <Radio.Group onChange={onChange} value={value}>
        <AntRadio value={Types.storeStore} checked={value === Types.storeStore}>
          Склад-Склад
        </AntRadio>
        <AntRadio value={Types.doorStore} checked={value === Types.doorStore} disabled>
          Дверь-Склад
        </AntRadio>
        <AntRadio value={Types.doorDoor} checked={value === Types.doorDoor} disabled>
          Дверь-Дверь
        </AntRadio>
        <AntRadio value={Types.storeDoor} checked={value === Types.storeDoor}>
          Склад-Дверь
        </AntRadio>
      </Radio.Group>
    </Flex>
  )
}
