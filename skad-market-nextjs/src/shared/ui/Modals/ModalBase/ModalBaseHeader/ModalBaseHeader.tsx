import { ReactNode } from 'react'
import { ModalCloseIcon } from '@assets/icons'
import { noop, useWindowSize } from '@shared/libs'
import { IconButton } from '@shared/ui/IconButton'
import { Flex } from 'antd'
import cn from 'classnames'
import css from './ModalBaseHeader.module.scss'

interface ModalBaseHeaderProps {
  className?: string
  topBarStyles?: string
  title?: ReactNode
  // topBar displayed only on tablet and mobile
  topBar?: string
  displayAction?: boolean
  onClickAction?: VoidFunction
  displayMobileTitle?: boolean
  renderTopBarRideSide?: ReactNode
  renderTopBarLeftSide?: ReactNode
}

export const ModalBaseHeader = ({
  className,
  title,
  displayAction = false,
  renderTopBarRideSide,
  renderTopBarLeftSide,
  displayMobileTitle = true,
  onClickAction,
  topBar,
  topBarStyles,
}: ModalBaseHeaderProps) => {
  const { width } = useWindowSize()
  const isMobileSize = width < 768

  return (
    <Flex style={{ flexDirection: 'column' }}>
      {displayAction && !isMobileSize && (
        <Flex justify='flex-end'>
          <div className={css.action}>
            <IconButton icon={<ModalCloseIcon />} onClick={onClickAction || noop} role='close-button' />
          </div>
        </Flex>
      )}
      <div className={cn(css.modalBaseHeader, className)}>
        {isMobileSize && (
          <div className={cn(css.topBar, topBarStyles)} role='ModalBaseHeader_topBar'>
            <Flex justify='space-between' align='center'>
              <Flex justify='space-between' style={{ flexGrow: 1 }}>
                <Flex style={{ paddingLeft: 12 }}>{renderTopBarLeftSide}</Flex>
                <Flex style={{ flexGrow: 1 }} justify='center'>
                  {topBar}
                </Flex>
              </Flex>
              {displayAction && (
                <Flex justify='flex-end'>
                  <div className={css.action}>
                    <IconButton icon={<ModalCloseIcon />} onClick={onClickAction || noop} role='close-button' />
                  </div>
                </Flex>
              )}
            </Flex>
          </div>
        )}
        <div className={css.rightSide}>
          <div className={cn(css.title, { [css.hideMobile]: !displayMobileTitle })} role='right-title'>
            {title}
          </div>
          {renderTopBarRideSide}
        </div>
      </div>
    </Flex>
  )
}

ModalBaseHeader.displayName = 'ModalBaseHeader'
