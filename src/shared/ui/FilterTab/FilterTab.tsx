import React from 'react'
import cn from 'classnames'
import css from './FilterTab.module.scss'
import { ICCloseLine } from '@assets/icons'

interface FilterTabProps {
  className?: string
  name: string
  values?: string[]
  onClose?: VoidFunction
}

export const FilterTab = ({ className, name, values = [], onClose }: FilterTabProps) => {
  const hasValues = values.length > 0
  return (
    <div className={cn(css.filterTab, className)}>
      <div className={css.name}>
        {name}
        {hasValues && ':'}
      </div>
      {hasValues && <div className={css.value}>{values.join(', ')}</div>}
      {onClose && (
        <div className={css.icon} onClick={onClose}>
          <ICCloseLine />
        </div>
      )}
    </div>
  )
}

FilterTab.displayName = 'FilterTab'
