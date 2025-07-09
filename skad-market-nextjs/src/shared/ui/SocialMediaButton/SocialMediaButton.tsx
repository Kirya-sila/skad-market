import React, { ReactNode } from 'react'
import cn from 'classnames'
import css from './SocialMediaButton.module.scss'
import { ICDrive, ICOK, ICTelegram, ICVK } from '@assets/icons'

interface SocialMediaButtonProps {
  className?: string
  icon?: 'tg' | 'vk' | 'ok' | 'd2'
  renderIcon?: ReactNode
}

const svgByName = {
  tg: <ICTelegram />,
  vk: <ICVK />,
  ok: <ICOK />,
  d2: <ICDrive />,
}

export const SocialMediaButton = ({ className, icon, renderIcon }: SocialMediaButtonProps) => {
  const socialIcon = typeof icon === 'string' ? svgByName[icon] || null : null
  const resolvedIcon = renderIcon ? renderIcon : socialIcon
  return <div className={cn(css.socialMediaButton, className)}>{resolvedIcon}</div>
}

SocialMediaButton.displayName = 'SocialMediaButton'
