'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface NavLinkProps {
  to: string
  children: ReactNode
  className?: string
  activeClassName?: string
  onClick?: () => void
}

export const NavLink = ({ 
  to, 
  children, 
  className = '', 
  activeClassName = '', 
  onClick 
}: NavLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === to
  
  return (
    <NextLink 
      href={to} 
      className={`${className} ${isActive ? activeClassName : ''}`}
      onClick={onClick}
    >
      {children}
    </NextLink>
  )
}