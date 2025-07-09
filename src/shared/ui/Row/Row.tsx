import React, { PropsWithChildren } from 'react'
import cn from 'classnames'
import css from './Row.module.scss'

export interface RowProps extends PropsWithChildren {
  className?: string
}

export const Row = ({ className, children }: RowProps) => {
  return <div className={cn(css.row, className)}>{children}</div>
}

Row.displayName = 'Row'
