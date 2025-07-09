import React, { ReactNode } from 'react'
import cn from 'classnames'
import css from './RadioButton.module.scss'

export interface RadioButtonProps {
  className?: string
  label?: ReactNode | string
  disabled?: boolean
  error?: boolean
  name: string
  id: string
  value: string
  active: boolean
  onCheckRadioButton: () => void
}

export const RadioButton = ({
  className,
  label,
  disabled,
  error,
  name,
  id,
  value,
  active,
  onCheckRadioButton,
}: RadioButtonProps) => {

  return (
    <div
      className={cn(css.radioButton, className, {
        [css.disabled]: disabled,
        [css.checked]: active,
        [css.error]: error,
      })}
    >
      <label>
        <input
          type='radio'
          disabled={disabled || error}
          // onChange={(e) => {
          //   e.stopPropagation()
          //   onCheckRadioButton()
          // }}
          onClick={(e) => {
            e.stopPropagation()
            onCheckRadioButton()
          }}
          name={name}
          id={id}
          value={value}
        />
        <span>
          <div className={css.radioIcon} />
        </span>
        {label && <div className={css.text}>{label}</div>}
      </label>
    </div>
  )
}

RadioButton.displayName = 'RadioButton'
