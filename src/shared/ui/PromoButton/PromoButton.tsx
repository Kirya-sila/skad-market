import React from 'react'
import cn from 'classnames'
import css from './PromoButton.module.scss'

export interface PromoButtonProps {
  variant?: 'primary' | 'secondary'
  onClick?: VoidFunction
  className?: string
  label: string
}

export const PromoButton = ({ className, label, onClick, variant = 'secondary' }: PromoButtonProps) => {
  return (
    <div className={cn(css.promoButton, className, css[variant])} onClick={onClick}>
      {label}
    </div>
  )
}

PromoButton.displayName = 'PromoButton'
