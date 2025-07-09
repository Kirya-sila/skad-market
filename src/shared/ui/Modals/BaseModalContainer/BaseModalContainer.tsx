import { FC, ReactNode } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import css from './BaseModalContainer.module.scss'
import { CloseIcon } from '@/assets/icons'
import { Flex, FlexColumn, Underlay } from '@/shared/ui'

interface IBaseModalContainer {
  onClose: VoidFunction
  children: ReactNode
  bodyClassName?: string
  contentClassName?: string
}

export const BaseModalContainer: FC<IBaseModalContainer> = observer(
  ({ onClose, children, bodyClassName }) => {
    return (
      <Underlay onClick={onClose}>
        <FlexColumn classname={cn(css.layout, bodyClassName)} onClick={(e) => e.stopPropagation()}>
          <Flex classname={css.closeIcon}>
            <div style={{ cursor: 'pointer' }} onClick={onClose}>
              <CloseIcon />
            </div>
          </Flex>
          {children}
        </FlexColumn>
      </Underlay>
    )
  },
)
