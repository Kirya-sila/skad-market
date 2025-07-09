import React, { ReactNode } from 'react'
import cn from 'classnames'
import css from './IconButton.module.scss'

export interface IconButtonProps extends Partial<HTMLButtonElement> {
  className?: string
  icon: ReactNode
  disabled?: boolean
  onClick?: () => void
}

export const IconButton = ({ className, disabled, icon, onClick, ...otherProps }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      tabIndex={disabled ? -1 : 0}
      className={cn(css.iconButton, className, { [css.disabled]: disabled })}
      {...(otherProps as any)}
    >
      <div className={css.wrapper}>{icon}</div>
    </button>
  )
}

IconButton.displayName = 'IconButton'
