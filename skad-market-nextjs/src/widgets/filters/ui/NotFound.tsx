import { ICSearchM } from '@assets/icons'
import { RegularButton } from '@shared/ui'
import cn from 'classnames'
import css from './NotFound.module.scss'

interface NotFoundProps {
  className?: string
  onResetFilters: VoidFunction
}

export const NotFound = ({ className, onResetFilters }: NotFoundProps) => {
  return (
    <div className={cn(css.notFound, className)}>
      <div className={css.title}>Товаров не найдено</div>
      <div className={css.icon}>
        <ICSearchM />
      </div>
      <div className={css.subtitle}>По заданным параметрам нет подходящих товаров</div>
      <RegularButton text='Сбросить фильтры' size='small' onClick={onResetFilters} />
    </div>
  )
}

NotFound.displayName = 'NotFound'
