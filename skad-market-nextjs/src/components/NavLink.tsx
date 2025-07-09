'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  to: string
  children: React.ReactNode
  className?: string | ((props: { isActive: boolean }) => string)
  style?: React.CSSProperties | ((props: { isActive: boolean }) => React.CSSProperties)
  onClick?: () => void
}

export const NavLink: React.FC<NavLinkProps> = ({ 
  to, 
  children, 
  className, 
  style, 
  onClick 
}) => {
  const pathname = usePathname()
  const isActive = pathname === to
  
  const resolvedClassName = typeof className === 'function' ? className({ isActive }) : className
  const resolvedStyle = typeof style === 'function' ? style({ isActive }) : style
  
  return (
    <Link 
      href={to} 
      className={resolvedClassName}
      style={resolvedStyle}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}