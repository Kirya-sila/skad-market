import { ChangeEvent, FC, KeyboardEvent, ReactNode } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { DataAttributes } from '@shared/types'
import Password from 'antd/es/input/Password'
import cn from 'classnames'
import css from '../TextInput.module.scss'

export interface PasswordInputProps extends DataAttributes {
  type?: 'text' | 'email' | 'password'
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
  focused?: boolean
  label?: string
  disabled?: boolean
  placeholder?: string
  errorMessage?: string
  hasError?: boolean
  required?: boolean
  ariaLabel?: string
  id?: string
  name?: string
  className?: string
  inputClassName?: string
  autoCapitalize?: 'on' | 'none' | 'words' | 'characters'
  autoCorrect?: 'on' | 'off'
  maxLength?: number
  secondaryDescription?: ReactNode
  inputFilled?: boolean // for browser autofill
  onPressEnter?: VoidFunction
  displayCharCounter?: boolean
  renderRightIcon?: ReactNode
  onIconClick?: VoidFunction
  size?: 'small' | 'medium'
  autoComplete?: 'on' | 'off' | ''
  onBlur?: (e: any) => void
  onFocus?: VoidFunction
  onClick?: VoidFunction
  prefix?: ReactNode
  prefixStyles?: string
  addonBefore?: ReactNode
}

export const PasswordInput: FC<PasswordInputProps> = ({
  label,
  value = '',
  required = true,
  focused = false,
  disabled = false,
  onChange,
  id,
  name,
  type = 'text',
  errorMessage,
  hasError = false,
  className,
  inputClassName,
  autoCapitalize = 'on',
  autoCorrect = 'on',
  onPressEnter,
  renderRightIcon,
  size = 'medium',
  onBlur,
  onFocus,
  onClick,
  autoComplete = '',
  prefix,
  addonBefore,
  ...otherProps
}) => {
  const inputLabel = required ? label + '*' : label

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' && onPressEnter) onPressEnter()
  }

  return (
    <div className={cn(css.inputContainer, className)}>
      <Password
        className={cn(
          css.inputItem,
          css[size],
          {
            [css.inputItemFilledPassword]: type === 'password',
            [css.inputItemFilled]: value || prefix,
            [css.inputItemError]: errorMessage || hasError,
            [css.labeless]: !label,
            [css.withRightIcon]: renderRightIcon,
          },
          inputClassName,
        )}
        {...otherProps}
        prefix={prefix}
        addonBefore={addonBefore}
        id={id}
        name={name}
        type='password'
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        onKeyUp={handleKeyUp}
        onClick={(e) => {
          e.stopPropagation()
          if (onClick) {
            onClick()
          }
        }}
        onFocus={onFocus}
        autoComplete={autoComplete}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      {label && (
        <label className={cn(css.inputLabel, { [css.inputLabelShort]: type === 'password' })} htmlFor={name}>
          {inputLabel}
        </label>
      )}
      {errorMessage && !disabled && <div className={cn(css.message, css.errorMessage)}>{errorMessage}</div>}
    </div>
  )
}
