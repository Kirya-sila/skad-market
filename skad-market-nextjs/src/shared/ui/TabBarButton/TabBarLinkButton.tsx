import cn from 'classnames'
import { NavLink } from 'react-router-dom'
import css from './TabBarButton.module.scss'
import { ITabBarButton } from './interfaces'

interface TabBarLinkButtonProps extends ITabBarButton {
  path: string
  badge?: number
}

export const TabBarLinkButton = ({ className, icon, label, path, badge }: TabBarLinkButtonProps) => {
  return (
    <NavLink
      className={cn(css.tabLink, className)}
      to={path}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      {({ isActive }) => (
        <div className={cn(css.tabButtonLink, { [css.tabButtonActive]: isActive })}>
          <div>{icon}</div>
          {!!badge && <div className={css.badge}>{badge > 99 ? '99+' : badge}</div>}
          <div className={css.label}>{label}</div>
        </div>
      )}
    </NavLink>
  )
}
