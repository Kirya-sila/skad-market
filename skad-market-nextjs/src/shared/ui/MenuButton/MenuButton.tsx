import { forwardRef, ReactNode, useRef } from 'react'
import { withPreventDefault } from '@shared/libs/utils/dom'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import css from './MenuButton.module.scss'

export interface MenuButtonProps {
  className?: string
  text?: string | null | undefined
  disabled?: boolean
  leftIcon?: ReactNode
  onClick: VoidFunction
  size?: 'large' | 'middle'
  badge?: number
}

export const MenuButton = observer(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLButtonElement, MenuButtonProps>(
    ({ className, size = 'large', disabled, leftIcon, onClick, text, badge }, ref) => {
      const innerRef = useRef(null)
      const resolvedRef = ref || innerRef

      return (
        <button
          ref={resolvedRef}
          disabled={disabled}
          onMouseDown={withPreventDefault(onClick)}
          className={cn(css.menuButton, className, css[size], { [css.labeless]: typeof text !== 'string' })}
        >
          <>
            {leftIcon && (
              <span className={css.icon}>
                {leftIcon}
                {!!badge && <div className={css.badge}>{badge > 99 ? '99+' : badge}</div>}
              </span>
            )}
            <span role='label'>{text}</span>
          </>
        </button>
      )
    },
  ),
)
