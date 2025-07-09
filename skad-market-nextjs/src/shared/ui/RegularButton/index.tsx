import { CSSProperties, forwardRef, MouseEventHandler, PropsWithChildren, ReactNode, useRef } from 'react'
import cn from 'classnames'
import css from './style.module.scss'

export type RegularButtonProps = PropsWithChildren<{
  text?: ReactNode
  loading?: boolean
  disabled?: boolean
  className?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  style?: CSSProperties
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  size?: 'large' | 'middle' | 'small'
  variant?: 'outline' | 'filled' | 'text'
  appearance?: 'primary' | 'secondary' | 'textNegative' | 'primaryNegative' | 'defaultText'
  fullWidth?: boolean
  form?: string
  type?: 'submit' | 'button'
}>

export const RegularButton = forwardRef<HTMLButtonElement, RegularButtonProps>(
  (
    {
      text,
      style,
      onClick,
      loading,
      disabled,
      leftIcon,
      rightIcon,
      className,
      size = 'large',
      fullWidth = false,
      variant = 'filled',
      appearance = 'primary',
      form,
      type = 'button',
    },
    ref,
  ) => {
    const innerRef = useRef(null)
    const resolvedRef = ref || innerRef

    return (
      <button
        type={type}
        form={form}
        style={style}
        onClick={onClick}
        ref={resolvedRef}
        disabled={disabled}
        className={cn(css.button, css[size], css[variant], css[appearance], { [css.fullWidth]: fullWidth }, className)}
      >
        {leftIcon && <span className={css.icon}>{leftIcon}</span>}
        {text}
        {rightIcon && <span className={css.icon}>{rightIcon}</span>}
      </button>
    )
  },
)

RegularButton.displayName = 'RegularButton'
