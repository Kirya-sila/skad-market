import React from 'react'
import cn from 'classnames'
import css from './TooltipBaseVariant.module.scss'

interface TooltipBaseVariantProps {
  className?: string
  text: string
}

export const TooltipBaseVariant = ({ className }: TooltipBaseVariantProps) => {
  return <div className={cn(css.tooltipBaseVariant, className)}></div>
}

TooltipBaseVariant.displayName = 'TooltipBaseVariant'
