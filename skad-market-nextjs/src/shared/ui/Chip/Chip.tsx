import React from 'react'
import cn from 'classnames'
import css from './Chip.module.scss'
import { CloseIcon } from '@assets/icons'

interface ChipProps {
  className?: string
  label?: string | number
  onClose?: VoidFunction
}

export const Chip = ({ className, label, onClose }: ChipProps) => {
  return (
    <div className={cn(css.chip, className)}>
      <div className={css.label}>{label}</div>
      <div className={css.closeIcon} onClick={onClose}>
        <CloseIcon />
      </div>
    </div>
  )
}

Chip.displayName = 'Chip'
