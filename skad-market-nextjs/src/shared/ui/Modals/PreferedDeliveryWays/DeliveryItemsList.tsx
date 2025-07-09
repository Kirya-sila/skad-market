import { FC } from 'react'
import { Flex } from 'antd'
import { FlexColumn } from '../../Flex'
import { RadioButton } from '../../RadioButton'
import { SectionTitle } from '../../TextFields'
import { Dots } from './Dots'
import css from './PreferedDeliveryWaysModal.module.scss'
import { IUserDeliveryItem } from '@/interfaces'

interface IDeliveryItemsList {
  deliveryItems: IUserDeliveryItem[]
  checkedId: string
  onCheckDeliveryItem: (id: string) => void
}

export const DeliveryItemsList: FC<IDeliveryItemsList> = ({ deliveryItems, checkedId, onCheckDeliveryItem }) => {
  return (
    <FlexColumn classname={css.deliveryItemsContainer}>
      {deliveryItems.map(({ id, isDeliveryAddress, addressTitle }) => (
        <Flex key={id} align='flex-start' style={{ width: '100%' }} gap={8}>
          <RadioButton
            id={id}
            name={id}
            value={id}
            label=''
            active={checkedId === id}
            onCheckRadioButton={() => onCheckDeliveryItem(id)}
          />
          <Flex className={css.deliveryItem} gap={16}>
            <Flex vertical>
              <span>{isDeliveryAddress ? 'Курьерская доставка DPD' : 'Пункт выдачи DPD'}</span>
              <SectionTitle>{addressTitle}</SectionTitle>
            </Flex>
            <Dots id={id} isLast={deliveryItems.length === 1} />
          </Flex>
        </Flex>
      ))}
    </FlexColumn>
  )
}
