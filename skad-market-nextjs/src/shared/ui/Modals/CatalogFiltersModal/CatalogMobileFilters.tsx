import { useState } from 'react'
import { CloseIcon } from '@assets/icons'
import { SwitchFilter } from '@entities/Rims/ui/FilterBar/SwitchFilter'
import { noop } from '@shared/libs'
import { plural } from '@shared/libs/utils/string'
import { Chip, ModalBaseHeader, RegularButton } from '@shared/ui'
import { NotFoundFilter } from '@shared/ui/Modals/CatalogFiltersModal/NotFoundFilter'
import { localizedFilter } from '@shared/ui/Modals/CatalogFiltersModal/const'
import ModalBase from '@shared/ui/Modals/ModalBase/ModalBase'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import css from './CatalogMobileFilters.module.scss'
import { AvailableFilter, rimsStore } from '@/entities/Rims/model/rimsStore'
import { ActiveFilterName, RimFilter } from '@/entities/Rims/model/types'
import { ColorFilterItem } from '@/entities/Rims/ui/FilterBar/ColorFilterItem'
import { DefaultFilter } from '@/entities/Rims/ui/FilterBar/DefaultFilter'
import { ParamsHelpBottomSheet } from '@/features/filters/ui'
import { ParamsHelpBottomSheetProps } from '@/features/filters/ui/ParamsHelpBottomSheet/ParamsHelpBottomSheet'
import { getModalPropsByFilterName } from '@/features/filters/ui/ParamsHelpModal/lib/getModalPropsByFilterName'
import { PriceRange } from '@/widgets'

export interface CatalogMobileFiltersProps {
  className?: string
  onClose: VoidFunction
}

const CatalogMobileFilters = observer(({ className, onClose }: CatalogMobileFiltersProps) => {
  const { resetFiltersAndReload, filteredGroupRims, activeFilters, filters, toggleFilter } = rimsStore
  const [helpBottomSheetProps, setHelpBottomSheetProps] = useState<Partial<ParamsHelpBottomSheetProps>>({})

  // const isNotFound = filteredRims.length < 1
  const isNotFound = filteredGroupRims.length < 1

  const handleHideBottomSheet = () => {
    setHelpBottomSheetProps({ ...helpBottomSheetProps, visibility: false })
  }

  const handleShowBottomSheet = (filterName: ActiveFilterName) => () => {
    const bottomSheetProps = getModalPropsByFilterName(filterName)

    setHelpBottomSheetProps({
      ...bottomSheetProps,
      hide: handleHideBottomSheet,
      visibility: true,
      footer: {
        text: 'Все параметры дисков и как их узнать',
        onClick: noop,
      },
    })
  }

  const handleReset = (filterName: ActiveFilterName, value: string | number) => () => {
    toggleFilter(filterName, value)
  }

  const renderFilterItem = (filter: AvailableFilter<keyof RimFilter>) => {
    switch (filter.name) {
      case 'isNew':
      case 'isHit':
      case 'inStock':
      case 'setFrom':
        // case 'withReviews':
        return <SwitchFilter filter={filter} isMobile key={filter.name} />
      case 'price':
        return <PriceRange filter={filter} key={filter.name} />
      case 'color':
        return <ColorFilterItem filter={filter} isMobile key={filter.name} />
      default:
        return (
          <DefaultFilter
            isMobile
            filter={filter}
            key={filter.name}
            onShowAll={onClose}
            onHelp={handleShowBottomSheet(filter.name)}
          />
        )
    }
  }

  const renderBody = () => {
    if (isNotFound) {
      const priceFilter = filters.find((filter) => filter.name === 'price')
      if (!priceFilter) return
      return <NotFoundFilter filter={priceFilter} />
    }

    return (
      <div className={css.body}>
        {filters.map(renderFilterItem)}
        <div className={css.allFilters}>
          {activeFilters.map((filter) => {
            if (localizedFilter[filter.name])
              return (
                <Chip
                  key={filter.name}
                  label={localizedFilter[filter.name]}
                  onClose={handleReset(filter.name, filter.name === 'setFrom' ? 4 : '-')}
                />
              )

            return filter.values.map((value) => (
              <Chip key={value} label={value} onClose={handleReset(filter.name, value)} />
            ))
          })}
          {!!activeFilters.length && (
            <RegularButton
              className={css.reset}
              leftIcon={<CloseIcon />}
              onClick={resetFiltersAndReload}
              variant='text'
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn(css.catalogMobileFilters, className)}>
      <ModalBase
        renderHeader={
          <ModalBaseHeader
            className={css.modalHeader}
            topBar='Фильтры'
            title='Фильтры'
            displayAction
            onClickAction={onClose}
            displayMobileTitle={false}
          />
        }
        renderBody={renderBody()}
        onClose={onClose}
        className={css.modal}
        renderFooter={
          <div className={css.footer}>
            <RegularButton
              onClick={onClose}
              text={
                isNotFound
                  ? 'Показать'
                  : `Показать ${rimsStore.total} ${plural(+rimsStore.total, ['товар', 'товара', 'товаров'])}`
              }
              disabled={isNotFound}
              fullWidth
              size='middle'
            />
          </div>
        }
      />
      <ParamsHelpBottomSheet {...(helpBottomSheetProps as ParamsHelpBottomSheetProps)} />
    </div>
  )
})

export default CatalogMobileFilters

CatalogMobileFilters.displayName = 'CatalogMobileFilters'
