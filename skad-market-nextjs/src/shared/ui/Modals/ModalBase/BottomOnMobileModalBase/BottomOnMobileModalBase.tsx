import { FC, ReactNode } from 'react'
import cn from 'classnames'
import ModalBase from '../ModalBase'
import css from './BottomOnMobileModalBase.module.scss'

interface IBottomOnMobileModalBase {
  onClose: VoidFunction
  className?: string
  headerContent?: ReactNode
  footerContent?: ReactNode
  bodyContent?: ReactNode
}

export const BottomOnMobileModalBase: FC<IBottomOnMobileModalBase> = ({
  onClose,
  className,
  headerContent,
  footerContent,
  bodyContent,
}) => {
  return (
    <ModalBase
      renderHeader={headerContent}
      renderBody={bodyContent}
      onClose={onClose}
      renderFooter={footerContent}
      className={cn(className, css.root)}
    />
  )
}
