import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface LinkProps {
  href: string
  children: ReactNode
  className?: string
  activeClassName?: string
  onClick?: () => void
}

export const Link = ({ href, children, className = '', activeClassName = '', onClick }: LinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href
  
  return (
    <NextLink 
      href={href} 
      className={`${className} ${isActive ? activeClassName : ''}`}
      onClick={onClick}
    >
      {children}
    </NextLink>
  )
}