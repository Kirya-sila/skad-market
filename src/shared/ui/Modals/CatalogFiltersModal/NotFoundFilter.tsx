import cn from 'classnames'
import css from './NotFoundFilter.module.scss'
import { rimsStore } from '@/entities/Rims/model/rimsStore'
import { FilterProps } from '@/entities/Rims/ui/FilterBar/types'
import { PriceRange } from '@/widgets'
import { NotFound } from '@/widgets/filters'

interface NotFoundFilterProps extends FilterProps {
  className?: string
}

export const NotFoundFilter = ({ className, filter }: NotFoundFilterProps) => {
  const { resetFiltersAndReload } = rimsStore
  return (
    <div className={cn(css.notFoundFilter, className)}>
      <div className={css.range}>
        <PriceRange filter={filter} />
      </div>
      <NotFound onResetFilters={resetFiltersAndReload} />
    </div>
  )
}

NotFoundFilter.displayName = 'NotFoundFilter'
