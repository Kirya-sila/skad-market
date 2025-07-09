import React from 'react'
import { TooltipBaseVariant } from '@shared/ui/Tooltip/TooltipBaseVariant'
import { ITooltip, Tooltip as RectTooltip } from 'react-tooltip'
import css from './Tooltip.module.scss'

export interface TooltipProps extends ITooltip {
  className?: string
  id: string
  text?: string
  content: any
}

export const Tooltip = ({ children, id, text, content, place, ...tooltipProps }: TooltipProps) => {
  return (
    <>
      <div data-tooltip-id={id} data-tooltip-content={text} data-tooltip-place={place}>
        {children as any}
      </div>
      <RectTooltip id={id} {...tooltipProps} className={css.tooltip} closeOnScroll>
        {content}
      </RectTooltip>
    </>
  )
}

Tooltip.Base = TooltipBaseVariant
Tooltip.displayName = 'Tooltip'
