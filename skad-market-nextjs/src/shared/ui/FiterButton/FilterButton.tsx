import React from 'react'
import cn from 'classnames'
import css from './FilterButton.module.scss'
import { ICLineFilter } from '@/features/filters/ui/assets/ICLineFilter'

interface FilterButtonProps {
  className?: string
  label?: string
  count: number
  onClick: VoidFunction
  size?: 'large' | 'small'
}

export const FilterButton = ({ className, count, label = 'Фильтры', onClick, size = 'large' }: FilterButtonProps) => {
  const resolvedCount = count > 9 ? '9+' : String(count)
  return (
    <div className={cn(css.filterButton, className, css[size])} onClick={onClick}>
      <div className={css.label}>{label}</div>
      <div className={css.icon}>
        <ICLineFilter />
        {count > 0 && <div className={css.count}>{resolvedCount}</div>}
      </div>
    </div>
  )
}

FilterButton.displayName = 'FilterButton'
