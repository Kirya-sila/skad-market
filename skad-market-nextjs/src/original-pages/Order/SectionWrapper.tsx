import { FC, ReactNode } from 'react'
import cn from 'classnames'
import css from './Order.module.scss'
import { FlexColumn } from '@/shared/ui'

interface ISectionWrapper {
  children: ReactNode
  title?: string
  className?: string
}

export const SectionWrapper: FC<ISectionWrapper> = ({ children, className, title = '' }) => {
  return (
    <FlexColumn classname={cn(css.sectionWrapper, className)}>
      {!!title && <span className={css.sectionTitle}>{title}</span>}
      {children}
    </FlexColumn>
  )
}
