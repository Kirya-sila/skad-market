import React from 'react'
import cn from 'classnames'
import css from './Breadcrumbs.module.scss'

interface BreadcrumbsProps {
  className?: string
}

export const Breadcrumbs = ({ className }: BreadcrumbsProps) => {
  return <div className={cn(css.breadcrumbs, className)}>

  </div>
}

Breadcrumbs.displayName = 'Breadcrumbs'
