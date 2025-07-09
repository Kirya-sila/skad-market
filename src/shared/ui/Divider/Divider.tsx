import React from 'react'
import cn from 'classnames'
import css from './Divider.module.scss'

interface DividerProps {
  className?: string
}

export const Divider = ({ className }: DividerProps) => {
  return <div className={cn(css.divider, className)}></div>
}

Divider.displayName = 'Divider'
