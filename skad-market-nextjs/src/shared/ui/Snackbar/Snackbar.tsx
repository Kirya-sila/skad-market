import React, { useEffect } from 'react'
import css from './Snackbar.module.scss'
import { CircleProgress, RegularButton } from '@shared/ui'
import cn from 'classnames'
import { useCountdownCounter, useSmoothVisibility } from '@shared/libs'

interface SnackbarProps {
  className?: string
  label: string
  hide: VoidFunction
  subLabel?: string
  visible: boolean
  onCancel?: VoidFunction
  showTimer?: boolean
}

const COUNTER_START_VALUE = 5

export const Snackbar = ({
  hide,
  label,
  visible,
  onCancel,
  className,
  showTimer = false,
  subLabel = 'товар добавлен в избранное',
}: SnackbarProps) => {
  const { shouldRender, isVisible, resetVisibility } = useSmoothVisibility(visible, 200)
  const {
    current: timeLeft,
    stop,
    reset: resetCounter,
  } = useCountdownCounter({
    startValue: COUNTER_START_VALUE,
    endValue: 0,
    interval: 850,
    onEnd: hide,
  })

  useEffect(() => {
    if (visible) {
      resetCounter(COUNTER_START_VALUE)
      resetVisibility(visible)
    }
  }, [visible, resetCounter, resetVisibility])

  const handleCancel = () => {
    onCancel?.()
    stop()
    hide()
  }

  if (!shouldRender) return null

  return (
    <div className={cn(css.snackbar, className, { [css.visible]: isVisible, [css.hidden]: !isVisible })}>
      <div className={css.text}>
        <span className={css.label}>{label}</span>
        <span className={css.subLabel}>{subLabel}</span>
      </div>
      {showTimer && (
        <div className={css.timerAndAction}>
          <CircleProgress current={timeLeft} total={COUNTER_START_VALUE} radius={14} strokeWidth={1} />
          <RegularButton
            size="small"
            onClick={handleCancel}
            text="Отменить"
            variant="outline"
            appearance="secondary"
            className={css.cancelButton}
          />
        </div>
      )}
    </div>
  )
}

Snackbar.displayName = 'Snackbar'
