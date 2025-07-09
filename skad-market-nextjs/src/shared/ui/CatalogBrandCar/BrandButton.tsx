import React, { ReactNode } from 'react'
import cn from 'classnames'
import css from './CatalogBrandCar.module.scss'

interface CatalogBrandCarProps {
  className?: string
  onClick?: VoidFunction
  icon: ReactNode
  label?: string
}

export const BrandButton = ({ className, onClick, label, icon }: CatalogBrandCarProps) => {
  return (
    <div className={cn(css.brandButton, className)} onClick={onClick}>
      <div className={css.icon}>{icon}</div>
      <div className={css.label}>{label}</div>
    </div>
  )
}

BrandButton.displayName = 'BrandButton'
