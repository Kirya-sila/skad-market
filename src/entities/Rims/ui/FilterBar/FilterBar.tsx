import { Modals } from '@app/config/modal/modals-confg'
import { SwitchFilter } from '@entities/Rims/ui/FilterBar/SwitchFilter'
import { noop, useModal } from '@shared/libs'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { ColorFilterItem } from './ColorFilterItem'
import { DefaultFilter } from './DefaultFilter'
import css from './FilterBar.module.scss'
import { AvailableFilter, rimsStore } from '@/entities/Rims/model/rimsStore'
import { ActiveFilterName, RimFilter } from '@/entities/Rims/model/types'
import { ParamsHelpModalProps } from '@/features/filters/ui/ParamsHelpModal/ParamsHelpModal'
import { getModalPropsByFilterName } from '@/features/filters/ui/ParamsHelpModal/lib/getModalPropsByFilterName'
import { PriceRange } from '@/widgets'

interface FilterBarProps {
  className?: string
}

export const FilterBar = observer(({ className }: FilterBarProps) => {
  const { resetFiltersAndReload, isInitial, filters } = rimsStore

  const paramsHelpModal = useModal<ParamsHelpModalProps>(Modals.ParamsHelpModal)

  const handleShowHelpModal = (filterName: ActiveFilterName) => () => {
    const modalProps = getModalPropsByFilterName(filterName)
    paramsHelpModal.open({
      onClose: paramsHelpModal.close,
      ...modalProps,
      footer: {
        text: 'Все параметры дисков и как их узнать',
        onClick: noop,
      },
    } as ParamsHelpModalProps)
  }

  const renderFilterItem = (filter: AvailableFilter<keyof RimFilter>) => {
    switch (filter.name) {
      case 'isNew':
      case 'isHit':
      case 'inStock':
      case 'setFrom':
        // case 'withReviews':
        return <SwitchFilter filter={filter} key={filter.name} />
      case 'price':
        return <PriceRange filter={filter} key={filter.name} />
      case 'color':
        return <ColorFilterItem filter={filter} key={filter.name} />
      default:
        return (
          <DefaultFilter filter={filter} key={filter.name} onShowAll={noop} onHelp={handleShowHelpModal(filter.name)} />
        )
    }
  }


  return (
    <div className={cn(css.filterBar, className)}>
      {filters.map(renderFilterItem)}
      <div className={cn(css.resetFilters, { [css.active]: !isInitial })} onClick={resetFiltersAndReload}>
        Отменить фильтры
      </div>
    </div>
  )
})

FilterBar.displayName = 'FilterBar'
