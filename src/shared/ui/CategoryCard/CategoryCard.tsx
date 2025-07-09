import React, { MouseEventHandler, ReactNode } from 'react'
import cn from 'classnames'
import css from './CategoryCard.module.scss'

interface CategoryCardProps {
  label: string
  image: ReactNode
  className?: string
  variant?: 'main' | 'cart'
  onClick?: ()=> void
}

export const CategoryCard = ({ label, image, className, variant = 'main', onClick }: CategoryCardProps) => {
  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div onMouseDown={handleClick} tabIndex={1} className={cn(css.categoryCard, className, css[variant])} onClick={onClick}>
      <div className={css.image}>{image}</div>
      <div className={css.label}>{label}</div>
    </div>
  )
}

CategoryCard.displayName = 'CategoryCard'
