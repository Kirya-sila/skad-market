import {
  ChangeEvent,
  forwardRef,
  KeyboardEvent,
  LegacyRef,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import { DataAttributes } from '@shared/types'
import cn from 'classnames'
import css from './TextInput.module.scss'
import { Input, InputRef } from 'antd'

const IcPasswordMOutline = (...props: []) => null
const IcPasswordShowMOutline = (...props: []) => null

export interface TextInputProps extends DataAttributes {
  type?: 'text' | 'email' | 'password'
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
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

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      value = '',
      placeholder = '',
      required = false,
      focused = false,
      disabled = false,
      onChange,
      id,
      name,
      type = 'text',
      errorMessage,
      hasError = false,
      ariaLabel = type,
      className,
      inputClassName,
      autoCapitalize = 'on',
      autoCorrect = 'on',
      maxLength,
      secondaryDescription,
      onPressEnter,
      displayCharCounter = false,
      renderRightIcon,
      onIconClick,
      size = 'medium',
      onBlur,
      onFocus,
      onClick,
      autoComplete = '',
      prefix,
      prefixStyles,
      addonBefore,
      ...otherProps
    },
    forwardedRef,
  ) => {
    const internalRef = useRef(null)
    const ref = (forwardedRef || internalRef) as RefObject<HTMLInputElement>
    const inputLabel = required ? label + '*' : label
    const emailPlaceholder = !value?.length ? placeholder || '' : ''
    const [inputType, setInputType] = useState(type)
    // const { inputProps, errorMessageProps } = useTextField(
    //   { isRequired: required, errorMessage, maxLength, type, isDisabled: disabled, 'aria-label': ariaLabel },
    //   ref,
    // )

    useEffect(() => {
      focused && ref.current?.focus()
    }, [])

    const handleInputTypeToggle = (inputType: 'text' | 'password') => () => {
      !disabled && setInputType(inputType)
    }

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.code === 'Enter' && onPressEnter) onPressEnter()
    }

    return (
      <div className={cn(css.inputContainer, className)}>
        <Input
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
          type={inputType}
          disabled={disabled}
          ref={ref as unknown as LegacyRef<InputRef> | undefined}
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
        />
        {label && (
          <label className={cn(css.inputLabel, { [css.inputLabelShort]: type === 'password' })} htmlFor={inputType}>
            {inputLabel}
          </label>
        )}
        {!value && (
          <label className={cn(css.inputPlaceholder, { [css.inputPlaceholderShort]: type === 'password' })}>
            {placeholder}
          </label>
        )}
        {/* {type === 'password' &&
          (inputType === 'password' ? (
            <IcPasswordMOutline
              className={css.passwordIcon}
              onClick={handleInputTypeToggle('text')}
              data-testid={`${otherProps['data-testid'] ?? 'password'}.tgl`}
            />
          ) : (
            <IcPasswordShowMOutline
              className={css.passwordShowIcon}
              onClick={handleInputTypeToggle('password')}
              data-testid={`${otherProps['data-testid'] ?? 'password'}.tgl`}
            />
          ))} */}
        {renderRightIcon && (
          <div className={css.rightIcon} onClick={onIconClick}>
            {renderRightIcon}
          </div>
        )}
        {errorMessage && !disabled && <div className={cn(css.message, css.errorMessage)}>{errorMessage}</div>}
        <div className={cn(css.descriptionContainer, { [css.onlyCharCounter]: !secondaryDescription })}>
          {secondaryDescription && (
            <span className={cn(css.message, css.secondaryDescription)}>{secondaryDescription}</span>
          )}
          {maxLength && displayCharCounter && (
            <span className={cn(css.message, css.secondaryDescription, css.charCounter)}>
              {value.length}/{maxLength}
            </span>
          )}
        </div>
      </div>
    )
  },
)

TextInput.displayName = 'TextInput'
