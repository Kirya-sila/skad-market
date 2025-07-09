import React from 'react'
import cn from 'classnames'
import css from './Badge.module.scss'

interface BadgeProps {
  className?: string
  count?: number
  onClick?: VoidFunction
}

export const Badge = ({ className, count, onClick }: BadgeProps) => {
  return (
    <div className={cn(css.badge, className)} onClick={onClick}>
      {count}
    </div>
  )
}

Badge.displayName = 'Badge'
