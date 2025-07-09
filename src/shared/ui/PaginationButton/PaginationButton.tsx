import React from 'react'
import cn from 'classnames'
import css from './PaginationButton.module.scss'

interface PaginationButtonProps {
  className?: string
  label: string | number
  onClick: VoidFunction
  active?: boolean
}

export const PaginationButton = ({ className, label, onClick, active = false }: PaginationButtonProps) => {
  return (
    <div className={cn(css.paginationButton, className, { [css.active]: active })} onClick={onClick}>
      {label}
    </div>
  )
}

PaginationButton.displayName = 'PaginationButton'
