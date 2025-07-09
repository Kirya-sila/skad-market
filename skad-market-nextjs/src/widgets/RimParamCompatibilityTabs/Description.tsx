import React, { memo } from 'react'
import cn from 'classnames'
import css from './Description.module.scss'
import { ICCloseLine } from '@assets/icons'

export interface DescriptionProps {
  className?: string
  title: string
  text: string
  onClose: VoidFunction
}

export const Description = memo(({ className, title, text, onClose }: DescriptionProps) => {
  return (
    <div className={cn(css.description, className)}>
      {title && <span className={css.title}>{title}. </span>}
      <span className={css.text}>{text}</span>
      <div className={css.close} onClick={onClose}>
        <ICCloseLine />
      </div>
    </div>
  )
})

Description.displayName = 'Description'
