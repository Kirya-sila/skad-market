import { PropsWithChildren } from 'react'
import { useBuyerLogout } from '@shared/libs'
import { Divider, MenuButton } from '@shared/ui'
import { MenuButtonProps } from '@shared/ui/MenuButton/MenuButton'
import { Tooltip } from '@shared/ui/Tooltip'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import css from './UserButtonTooltip.module.scss'
import { appRoutes } from '@/app-settings'

interface UserButtonTooltipProps extends PropsWithChildren {
  className?: string
  id?: string
}

const DEFAULT_PROPS: Omit<MenuButtonProps, 'onClick'> = {
  size: 'middle',
  className: css.contentButton,
}

export const UserButtonTooltip = ({ className, id = 'UserButtonTooltip', children }: UserButtonTooltipProps) => {
  const navigate = useNavigate()
  const logoutBuyer = useBuyerLogout()

  const logout = () => {
    logoutBuyer()
  }

  const tooltipContent = (
    <div className={css.tooltipContent}>
      <MenuButton {...DEFAULT_PROPS} text='Мой профиль' onClick={() => navigate(appRoutes.buyer.profile)} />
      <MenuButton {...DEFAULT_PROPS} text='Заказы' onClick={() => navigate(appRoutes.buyer.orders.root)} />
      <Divider />
      <MenuButton {...DEFAULT_PROPS} text='Выход' onClick={logout} />
    </div>
  )

  return (
    <div className={cn(css.userButtonTooltip, className)}>
      <Tooltip id={id} content={tooltipContent} clickable place='top-end'>
        {children}
      </Tooltip>
    </div>
  )
}

UserButtonTooltip.displayName = 'UserButtonTooltip'
