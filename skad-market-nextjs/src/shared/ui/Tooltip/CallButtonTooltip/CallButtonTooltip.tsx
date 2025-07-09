import { PropsWithChildren } from 'react'
import { formatPhoneNumber, noop, SKADMARKET_HOTLINE, WORK_SCHEDULE_FORMATTED } from '@shared/libs'
import { RegularButton } from '@shared/ui'
import { MenuButton, MenuButtonProps } from '@shared/ui/MenuButton/MenuButton'
import { Tooltip } from '@shared/ui/Tooltip'
import cn from 'classnames'
import css from './CallButtonTooltip.module.scss'

interface CallButtonTooltipProps extends PropsWithChildren {
  className?: string
  id?: string
  onOrderCallBack: VoidFunction
}

export const CallButtonTooltip = ({
  className,
  id = 'CallButtonTooltip',
  children,
  onOrderCallBack,
}: CallButtonTooltipProps) => {
  const DEFAULT_PROPS: MenuButtonProps = {
    onClick: noop,
    size: 'middle',
    className: css.contentButton,
  }
  const tooltipContent = (
    <div className={css.tooltipContent}>
      <div className={css.supTitle}>Позвонить</div>
      <a href={`tel:${SKADMARKET_HOTLINE}`}>
        <MenuButton text={formatPhoneNumber(SKADMARKET_HOTLINE)} onClick={noop} size='large' />
      </a>
      <div className={css.subTitle}>{WORK_SCHEDULE_FORMATTED}</div>
      <RegularButton
        text='Заказать обратный звонок'
        size='middle'
        variant='text'
        className={css.orderCallback}
        onClick={onOrderCallBack}
      />
    </div>
  )

  return (
    <div className={cn(css.callButtonTooltip, className)}>
      <Tooltip id={id} content={tooltipContent} clickable place='top-end'>
        {children}
      </Tooltip>
    </div>
  )
}

CallButtonTooltip.displayName = 'CallButtonTooltip'
