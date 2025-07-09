// import { VariationPlacement } from '@shared/ui/Tooltip/Tooltip'
import React from 'react'

export const calculatePosition = (
  // placement: VariationPlacement,
  placement: any,
  tooltipRef: React.RefObject<HTMLDivElement>,
  childrenRef: React.RefObject<HTMLDivElement>,
): React.CSSProperties => {
  const style: React.CSSProperties = { position: 'absolute' }
  if (!tooltipRef.current || !childrenRef.current) {
    return style
  }

  const childrenRect = childrenRef.current.getBoundingClientRect()
  const tooltipRect = tooltipRef.current.getBoundingClientRect()

  switch (placement) {
    case 'top':
    case 'top-start':
    case 'top-end':
      style.bottom = window.innerHeight - childrenRect.top + 'px'
      style.left = childrenRect.left + 'px'
      if (placement === 'top-end') {
        style.left = childrenRect.right - tooltipRect.width + 'px'
      }
      break
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      style.top = childrenRect.bottom + 'px'
      style.left = childrenRect.left + 'px'
      if (placement === 'bottom-end') {
        style.left = childrenRect.right - tooltipRect.width + 'px'
      }
      break
    case 'right':
    case 'right-start':
    case 'right-end':
      style.left = childrenRect.right + 'px'
      style.top = childrenRect.top + 'px'
      if (placement === 'right-end') {
        style.top = childrenRect.bottom - tooltipRect.height + 'px'
      }
      break
    case 'left':
    case 'left-start':
    case 'left-end':
      style.right = window.innerWidth - childrenRect.left + 'px'
      style.top = childrenRect.top + 'px'
      if (placement === 'left-end') {
        style.top = childrenRect.bottom - tooltipRect.height + 'px'
      }
      break
  }

  return style
}
