import React from 'react'
import cn from 'classnames'
import css from './LoadingOverlay.module.scss'
import { Spinner } from '@shared/ui/Spinner'

export interface LoadingOverlayProps {
  className?: string
}

export const LoadingOverlay = ({ className }: LoadingOverlayProps) => {
  return (
    <div className={cn(css.loadingOverlay, className)}>
      <Spinner />
    </div>
  )
}

LoadingOverlay.displayName = 'LoadingOverlay'
