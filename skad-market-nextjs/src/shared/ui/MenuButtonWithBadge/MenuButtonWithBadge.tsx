import { ReactNode } from 'react'
import { Badge } from '@shared/ui/Badge'
import { MenuButton } from '@shared/ui/MenuButton'
import cn from 'classnames'
import css from './MenuButtonWithBadge.module.scss'

interface MenuButtonWithBadgeProps {
  className?: string
  badge?: number
  onClick: VoidFunction
  onBadgeClick?: VoidFunction
  text?: string
  leftIcon?: ReactNode
  size?: 'large' | 'middle'
}

export const MenuButtonWithBadge = ({
  className,
  badge,
  size,
  onClick,
  text,
  leftIcon,
  onBadgeClick,
}: MenuButtonWithBadgeProps) => {
  return (
    <button className={cn(css.menuButtonWithBadge, className)}>
      <MenuButton size={size} className={css.fav} text={text} leftIcon={leftIcon} onClick={onClick} />
      {badge && <Badge count={badge} onClick={onBadgeClick} className={css.badge} />}
    </button>
  )
}

MenuButtonWithBadge.displayName = 'MenuButtonWithBadge'
