import React from 'react'
import cn from 'classnames'
import css from './Switch.module.scss'
import { withPreventDefault } from '@shared/libs/utils/dom'

interface SwitchProps {
  className?: string
  checked: boolean
  toggle: VoidFunction
  disabled?: boolean
}

export const Switch = ({ className, checked, toggle, disabled }: SwitchProps) => {
  return (
    <label
      className={cn(css.switch, className, { [css.disabled]: disabled })}
      tabIndex={1}
      onMouseDown={withPreventDefault()}
    >
      <input className={css.switchInput} type="checkbox" checked={checked} onChange={toggle} disabled={disabled} />
      <span className={css.slider} />
    </label>
  )
}

Switch.displayName = 'Switch'
