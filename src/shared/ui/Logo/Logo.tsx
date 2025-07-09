import css from './Logo.module.scss'
import { ReactNode } from 'react'

interface LogoProps {
  icon: ReactNode
  onClick?: () => void
}

export const Logo = ({ onClick, icon }: LogoProps) => {
  return (
    <div className={css.logo} onClick={onClick}>
      {icon}
    </div>
  )
}

Logo.displayName = 'Logo'
