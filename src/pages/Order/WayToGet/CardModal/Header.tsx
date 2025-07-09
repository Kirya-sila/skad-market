import { FC } from 'react'
import css from './MapModal.module.scss'
import { CloseIcon } from '@/assets/icons'
import { Flex, FlexRow, SkadMarketLogo } from '@/shared/ui'

interface IHeader {
  onClose: VoidFunction
}

export const Header: FC<IHeader> = ({ onClose }) => {
  return (
    <FlexRow classname={css.header}>
      <SkadMarketLogo size='large' />
      <Flex classname={css.closeIcon}>
        <div style={{ cursor: 'pointer' }} onClick={onClose}>
          <CloseIcon />
        </div>
      </Flex>
    </FlexRow>
  )
}
