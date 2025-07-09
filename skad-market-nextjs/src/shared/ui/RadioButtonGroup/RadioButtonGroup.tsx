import React, { ReactNode, useState } from 'react'
import cn from 'classnames'
import css from './RadioButtonGroup.module.scss'
import { RadioButton } from '@shared/ui/RadioButton'
import { noop } from '@shared/libs'

export interface RadioButtonItemState {
  id: string
  value: string
  disabled?: boolean
  label?: ReactNode | string
  error?: boolean
}

export interface RadioButtonGroupProps {
  className?: string
  name: string
  radioButtonsData: RadioButtonItemState[]
  onChange?: (activeId: string) => void
  activeId?: string
}

export const RadioButtonGroup = ({
  name,
  activeId,
  className,
  onChange = noop,
  radioButtonsData,
}: RadioButtonGroupProps) => {
  const [internalActiveId, setActiveId] = useState<string>('')

  if (!radioButtonsData.length) return null

  const handleChangeActive = (id: string) => {
    onChange?.(id)
    setActiveId(id)
  }

  return (
    <div className={cn(css.radioButtonGroup, className)}>
      {radioButtonsData.map(({ id, value, disabled = false, label, error = false }) => (
        <RadioButton
          id={id}
          key={id}
          name={name}
          value={value}
          label={label}
          error={error}
          disabled={disabled}
          active={activeId === id}
          onCheckRadioButton={() => onChange(id)}
        />
      ))}
    </div>
  )
}

RadioButtonGroup.displayName = 'RadioButtonGroup'
