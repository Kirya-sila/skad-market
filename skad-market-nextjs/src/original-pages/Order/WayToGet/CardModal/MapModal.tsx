import { FC } from 'react'
import { AddressInfo } from './AddressInfo'
import { Header } from './Header'
import css from './MapModal.module.scss'
import { Maps } from './Maps'
import { Tabs } from './Tabs'
import { Flex, FlexColumn, FlexRow, Underlay } from '@/shared/ui'

interface IMapModal {
  onClose: VoidFunction
}

export const MapModal: FC<IMapModal> = ({ onClose }) => {
  return (
    <Underlay onClick={onClose}>
      <FlexColumn classname={css.modal} onClick={(e) => e.stopPropagation()}>
        <Header onClose={onClose} />
        <FlexRow classname={css.rootContainer}>
          <FlexColumn classname={css.deliveryOptions}>
            <Tabs classname={css.tabs} />
            <AddressInfo />
          </FlexColumn>
          <Flex classname={css.cardContainer}>
            <Maps />
          </Flex>
        </FlexRow>
      </FlexColumn>
    </Underlay>
  )
}
