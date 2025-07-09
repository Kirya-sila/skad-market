import { localizedFilters } from '@entities/Rims/lib/localizeFilters'
import { FilterTab } from '@shared/ui'
import { localizedFilter } from '@shared/ui/Modals/CatalogFiltersModal/const'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import css from './AllFilters.module.scss'
import { rimsStore } from '@/entities/Rims/model/rimsStore'
import { ActiveFilterName } from '@/entities/Rims/model/types'

interface AllFiltersProps {
  className?: string
}

export const AllFilters = observer(({ className }: AllFiltersProps) => {
  const { resetFiltersAndReload, activeFilters, toggleFilter, resetFilterByGroup } = rimsStore

  const handleReset = (filterName: ActiveFilterName) => () => {
    toggleFilter(filterName, filterName === 'setFrom' ? 4 : '-')
  }

  const handleResetFilterByGroup = (filterName: ActiveFilterName) => () => {
    // if (filterName === 'carModel') {

    // }
    resetFilterByGroup(filterName)
  }

  return (
    <div className={cn(css.allFilters, className)}>
      {activeFilters.map((filter) => {
        if (localizedFilter[filter.name])
          // switch (boolean) filters
          return (
            <FilterTab
              key={filter.name}
              name={localizedFilter[filter.name] || filter.name}
              onClose={handleReset(filter.name)}
            />
          )

        return (
          <FilterTab
            key={filter.name}
            name={localizedFilters[filter.name] || filter.name}
            values={filter.values}
            onClose={handleResetFilterByGroup(filter.name)}
          />
        )

        // return filter.values.map(({ value }) => (
        //   // <Chip key={value} label={value} onClose={toggleAvailableFilter(filter.name, value)} />
        //   <FilterTab key={value} name={String(value)} onClose={toggleAvailableFilter(filter.name, value)} />
        // ))
      })}
      {!!activeFilters.length && (
        <div className={css.resetFilters} onClick={resetFiltersAndReload}>
          Отменить все фильтры
        </div>
      )}
    </div>
  )
})

AllFilters.displayName = 'AllFilters'
