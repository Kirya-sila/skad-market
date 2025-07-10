'use client'

import cn from 'classnames'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import css from './TabBarButton.module.scss'
import { ITabBarButton } from './interfaces'

interface TabBarLinkButtonProps extends ITabBarButton {
  path: string
  badge?: number
}

export const TabBarLinkButton = ({ className, icon, label, path, badge }: TabBarLinkButtonProps) => {
  const pathname = usePathname()
  const isActive = pathname === path

  return (
    <NextLink
      className={cn(css.tabLink, className)}
      href={path}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <div className={cn(css.tabButtonLink, { [css.tabButtonActive]: isActive })}>
        <div>{icon}</div>
        {!!badge && <div className={css.badge}>{badge > 99 ? '99+' : badge}</div>}
        <div className={css.label}>{label}</div>
      </div>
    </NextLink>
  )
}
