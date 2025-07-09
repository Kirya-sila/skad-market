import React from 'react'
import cn from 'classnames'
import css from './HookTab.module.scss'

interface TabProps {
  className?: string
  onClick?: VoidFunction
  disabled?: boolean
  selected?: boolean
  label: string
}

export const HookTab = ({ className, label, disabled = false, selected = false, onClick }: TabProps) => {
  return (
    <div className={cn(css.tab, className, { [css.selected]: selected, [css.disabled]: disabled })} onClick={onClick}>
      {label}
    </div>
  )
}

HookTab.displayName = 'HookTab'
