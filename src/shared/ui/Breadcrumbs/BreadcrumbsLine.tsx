import React from 'react'
import cn from 'classnames'
import css from './Breadcrumbs.module.scss'
import { BreadcrumbsItem, BreadcrumbsItemProps } from '@shared/ui/Breadcrumbs/BreadcrumbsItem'

interface BreadcrumbsLineProps {
  className?: string
  items: Array<BreadcrumbsItemProps>
}

export const BreadcrumbsLine = ({ className, items }: BreadcrumbsLineProps) => {
  return (
    <div className={cn(css.breadcrumbsLine, className)}>
      {items.map((itemProps, idx) => (
        <React.Fragment key={itemProps.label}>
          {idx > 0 && <span className={css.separator}>/</span>}
          <BreadcrumbsItem {...itemProps} />
        </React.Fragment>
      ))}
    </div>
  )
}

BreadcrumbsLine.displayName = 'BreadcrumbsLine'
