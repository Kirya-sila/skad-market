import React, { PropsWithChildren } from 'react'
import cn from 'classnames'
import css from './FilterTabMobile.module.scss'

interface FilterTabMobileProps extends PropsWithChildren {
  className?: string
  label?: string | number
  enabled?: boolean
  selected?: boolean
  disabled?: boolean
  onClick?: VoidFunction
}

export const FilterTabMobile = ({
  className,
  label,
  enabled,
  selected,
  disabled,
  onClick,
  children,
}: FilterTabMobileProps) => {
  return (
    <div
      className={cn(css.filterTabMobile, className, {
        [css.enabled]: enabled,
        [css.selected]: selected,
        [css.disabled]: disabled,
      })}
      onClick={onClick}
    >
      {children || label}
    </div>
  )
}

FilterTabMobile.displayName = 'FilterTabMobile'
