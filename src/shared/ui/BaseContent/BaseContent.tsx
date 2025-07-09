import React, { FC, ReactNode } from 'react'
import { Flex } from 'antd'
import cn from 'classnames'
import { Spinner } from '../Spinner'
import css from './BaseContent.module.scss'
import { withStopPropagation } from '@/shared/libs'

interface IBaseContent {
  className?: string
  bodyClassName?: string
  renderHeader?: ReactNode
  renderBody: ReactNode
  renderFooter?: ReactNode | null
  isLoading?: boolean
}

export const BaseContent: FC<IBaseContent> = ({
  isLoading,
  renderHeader,
  renderBody,
  renderFooter,
  className,
  bodyClassName,
}) => {
  return (
    <div onClick={withStopPropagation()} className={cn(css.modalBase, className)} tabIndex={-1} role='alertdialog'>
      {isLoading ? (
        <Flex style={{ width: '98%', height: 768 }} align='center'>
          <Spinner />
        </Flex>
      ) : (
        <Flex vertical style={{ height: '100%' }}>
          {renderHeader}
          <div className={css.bodyContainer}>
            <div className={css.scrollWrapper} role='modal-scroll-wrapper'>
              <div className={cn(css.body, bodyClassName)}>{renderBody}</div>
            </div>
          </div>
          {renderFooter && (
            <div className={css.footer} role='modal-footer'>
              {renderFooter}
            </div>
          )}
        </Flex>
      )}
    </div>
  )
}
