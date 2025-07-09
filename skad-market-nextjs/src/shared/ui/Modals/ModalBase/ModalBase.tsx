import { PropsWithChildren, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { BaseContent } from '../../BaseContent'
import css from './ModalBase.module.scss'

export interface ModalBaseProps {
  className?: string
  bodyClassName?: string
  renderHeader?: ReactNode
  renderBody: ReactNode
  renderFooter?: ReactNode
  onClose: VoidFunction
  isLoading?: boolean
}

const ModalBase = ({
  bodyClassName,
  className,
  onClose,
  renderHeader,
  renderBody,
  renderFooter,
  isLoading,
}: ModalBaseProps) => {
  // if (isLoading) return <Spinner />

  return (
    <Underlay onClick={onClose}>
      <BaseContent
        bodyClassName={bodyClassName}
        className={className}
        renderHeader={renderHeader}
        renderBody={renderBody}
        renderFooter={renderFooter}
        isLoading={isLoading}
      />
    </Underlay>
  )
}
ModalBase.displayName = 'ModalBase'

export default ModalBase

export const Underlay = ({ children, onClick, ...otherProps }: PropsWithChildren<{ onClick: VoidFunction }>) =>
  createPortal(
    <div
      role='modal-underlay'
      className={css.underlay}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      {...otherProps}
    >
      {children}
    </div>,
    document.body,
  )
