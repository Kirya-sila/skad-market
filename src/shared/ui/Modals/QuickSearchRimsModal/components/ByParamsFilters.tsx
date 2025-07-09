import { CloseIcon } from '@assets/icons'
import { Chip, RegularButton } from '@shared/ui'
import { FiltersRow } from '@shared/ui/Modals/QuickSearchRimsModal/components/FiltersRow'
import css from '../QuickSearchRimsModal.module.scss'
import { IMobileFilterParams, RimSpecifications } from '@/interfaces'

interface ByParamFiltersProps {
  className?: string
  onShowAll?: (title: string) => void
  activeFilter?: string
  onReset?: VoidFunction
  filters: IMobileFilterParams[]
  handleToggle: (name: RimSpecifications, value: number) => () => void
  resetFilters: () => void
  selectedItems: Record<RimSpecifications, number[]>
}

export const ByParamsFilters = ({ onShowAll, activeFilter, onReset, filters, resetFilters, handleToggle, selectedItems }: ByParamFiltersProps) => {

  const isShowOnlyOffset = activeFilter === 'Вылет'

  const handleShowOffset = () => {
    onShowAll?.('Вылет')
  }

  const handleReset = () => {
    onReset?.()
    resetFilters()
  }

  return (
    <div className={css.paramFilters}>
      {filters.map((filter) => {
        if (isShowOnlyOffset && filter.name !== RimSpecifications.offsets) {
          return null
        }

        return (
          <FiltersRow
            key={filter.name}
            title={filter.title}
            items={filter.values}
            selectedItems={selectedItems[filter.name] ?? []}
            handleToggle={(value) => handleToggle(filter.name, Number(value))}
            onShowAll={filter.name === RimSpecifications.offsets ? handleShowOffset : undefined}
            isShowAll={isShowOnlyOffset}
          />
        )
      })}
      <div className={css.result}>
        {Object.entries(selectedItems).flatMap(([name, values]) =>
          values.map((value) => (
            <Chip key={`${name}-${value}`} label={value.toString()} onClose={handleToggle(name as RimSpecifications, value)} />
          )),
        )}
        {Object.values(selectedItems).some((array) => array.length) && (
          <RegularButton leftIcon={<CloseIcon />} onClick={handleReset} variant='text' />
        )}
      </div>
    </div>
  )
}

ByParamsFilters.displayName = 'ByParamFilters'
