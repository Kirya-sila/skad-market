import { PropsWithChildren } from 'react'
import { composeActions } from '@shared/libs'
import { RegularButton } from '@shared/ui'
import { Tooltip } from '@shared/ui/Tooltip'
import cn from 'classnames'
import css from './ConfirmCityTooltip.module.scss'

interface ConfirmCityTooltipProps extends PropsWithChildren {
  id?: string
  isOpen?: boolean
  className?: string
  onConfirm: VoidFunction
  onChooseOtherCity: VoidFunction
  setIsOpen?: (isOpen: boolean) => void
}

export const ConfirmCityTooltip = ({
  id = 'ConfirmCityTooltip',
  isOpen,
  children,
  setIsOpen,
  onConfirm,
  className,
  onChooseOtherCity,
}: ConfirmCityTooltipProps) => {
  const forceHideTooltip = () => {
    document.body.click()
  }

  const tooltipContent = (
    <div className={css.tooltipContent}>
      <div className={css.title}>Это ваш город?</div>
      <div className={css.actions}>
        <RegularButton
          text='Выбрать другой'
          size='small'
          appearance='secondary'
          onClick={composeActions(forceHideTooltip, onChooseOtherCity)}
          className={css.change}
        />
        <RegularButton
          className={css.confirm}
          text='Да'
          size='small'
          onClick={composeActions(forceHideTooltip, onConfirm)}
        />
      </div>
    </div>
  )

  return (
    <div className={cn(css.confirmCityTooltip, className)} id={id}>
      <Tooltip id={id} content={tooltipContent} openOnClick clickable isOpen={isOpen} setIsOpen={setIsOpen}>
        {children}
      </Tooltip>
    </div>
  )
}

ConfirmCityTooltip.displayName = 'ConfirmCityTooltip'
