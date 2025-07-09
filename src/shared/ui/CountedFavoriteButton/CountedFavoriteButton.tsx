import React from 'react'
import cn from 'classnames'
import css from './CountedFavoriteButton.module.scss'
import { ICHeartLine } from '@assets/icons/ICHeartLine'

interface CountedFavoriteButtonProps {
  className?: string
  count?: number
}

export const CountedFavoriteButton = ({ className, count = 1 }: CountedFavoriteButtonProps) => {
  return (
    <div className={cn(css.countedFavoriteButton, className)}>
      <ICHeartLine />
      {count > 0 && <div className={css.counter}>{count}</div>}
    </div>
  )
}

CountedFavoriteButton.displayName = 'CountedFavoriteButton'
