import React from 'react'
import cn from 'classnames'
import css from './Breadcrumbs.module.scss'

export interface BreadcrumbsItemProps {
  label: string
  disabled?: boolean
  className?: string
  onClick?: VoidFunction
}

export const BreadcrumbsItem = ({ className, label, disabled, onClick }: BreadcrumbsItemProps) => {
  return (
    <div
      className={cn(css.breadcrumbs, className, { [css.disabled]: disabled })}
      onClick={disabled ? undefined : onClick}
    >
      {label}
    </div>
  )
}

BreadcrumbsItem.displayName = 'BreadcrumbsItem'
