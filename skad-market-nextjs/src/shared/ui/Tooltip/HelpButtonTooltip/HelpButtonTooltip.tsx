import { PropsWithChildren } from 'react'
import { noop } from '@shared/libs'
import { MenuButton } from '@shared/ui'
import { MenuButtonProps } from '@shared/ui/MenuButton/MenuButton'
import { Tooltip } from '@shared/ui/Tooltip'
import cn from 'classnames'
import css from './HelpButtonTooltip.module.scss'

interface HelpButtonTooltipProps extends PropsWithChildren {
  className?: string
  id?: string
}

export const HelpButtonTooltip = ({ className, id = 'HelpButtonTooltip', children }: HelpButtonTooltipProps) => {
  const DEFAULT_PROPS: MenuButtonProps = {
    onClick: noop,
    size: 'middle',
    className: css.contentButton,
  }
  const tooltipContent = (
    <div className={css.tooltipContent}>
      <MenuButton {...DEFAULT_PROPS} text='Покупателям' />
      <MenuButton {...DEFAULT_PROPS} text='Продавцам' />
      <MenuButton {...DEFAULT_PROPS} text='Доставка и оплата' />
      <MenuButton {...DEFAULT_PROPS} text='Гарантии и возврат' />
      <MenuButton {...DEFAULT_PROPS} text='Полезно знать' />
      <MenuButton {...DEFAULT_PROPS} text='Вопрос-ответ' />
    </div>
  )

  return (
    <div className={cn(css.helpButtonTooltip, className)}>
      <Tooltip id={id} content={tooltipContent} clickable place='bottom-end'>
        {children}
      </Tooltip>
    </div>
  )
}

HelpButtonTooltip.displayName = 'HelpButtonTooltip'
