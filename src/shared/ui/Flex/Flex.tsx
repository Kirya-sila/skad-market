import { FC, ReactNode } from 'react'
import cn from 'classnames'
import css from './Flex.module.scss'

interface IFlex {
  children: ReactNode
  classname?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  id?: string
}

export const FlexColumn: FC<IFlex> = ({ children, classname, onClick, ...rest }) => {
  return <div {...rest} onClick={onClick} className={cn(css.flexColumn, classname)}>{children}</div>
}

export const FlexRow: FC<IFlex> = ({ children, classname, onClick, ...rest }) => {
  return (
    <div {...rest} onClick={onClick} className={cn(css.flexRow, classname)}>
      {children}
    </div>
  )
}

export const Flex: FC<IFlex> = ({ children, classname, onClick, ...rest }) => {
  return <div {...rest} onClick={onClick} className={cn(css.flex, classname)}>{children}</div>
}
