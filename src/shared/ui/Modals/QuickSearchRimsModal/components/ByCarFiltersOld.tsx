import React, { useEffect, useState } from 'react'
import css from '../QuickSearchRimsModal.module.scss'
import { FiltersRow } from '@shared/ui/Modals/QuickSearchRimsModal/components/FiltersRow'
import { Chip, RegularButton } from '@shared/ui'
import cn from 'classnames'
import { CAR_FILTERS, CAR_MODELS_BY_MARK } from '../utils/mocks'
import { CloseIcon } from '@assets/icons'

interface ByCarFiltersProps {
  className?: string
  onShowAll?: (title: string) => void
  activeFilter?: string
  onReset?: VoidFunction
}

export const ByCarFiltersOld = ({ className, onShowAll, activeFilter, onReset }: ByCarFiltersProps) => {
  const [brand, setBrand] = useState<string | null>(null)
  const [model, setModel] = useState<string | null>(null)
  const currentModel = CAR_MODELS_BY_MARK.find((car) => car.mark === brand)?.models

  useEffect(() => {
    if (model && !currentModel?.includes(model)) {
      setModel(null)
    }
  }, [currentModel])

  const handleSetItem = (item: string, selectedItem: string | null, setItem: (value: string | null) => void) => () => {
    const isSelected = selectedItem === item
    if (!isSelected) {
      setItem(item)
    } else {
      setItem(null)
    }
  }

  const isDisplayMark = activeFilter === '' || activeFilter === 'Марка'
  const isDisplayModels = activeFilter === '' || activeFilter === 'Модель'

  const handleResetAll = () => {
    setBrand(null)
    setModel(null)

    if (activeFilter) {
      onReset?.()
    }
  }

  return (
    <div className={cn(css.carFilters, className)}>
      {/* {isDisplayMark &&
        CAR_FILTERS.map(({ type, title, values }) => (
          <FiltersRow
            key={type}
            title={title}
            items={values}
            selectedItems={brand ? [brand] : []}
            handleToggle={(item: string) => handleSetItem(item, brand, setBrand)}
            isShowAll={activeFilter === title}
            onShowAll={() => onShowAll?.(title)}
            limit={11}
          />
        ))}
      {currentModel && isDisplayModels && (
        <FiltersRow
          key={model}
          title='Модель'
          items={currentModel}
          selectedItems={model ? [model] : []}
          handleToggle={(item: string) => handleSetItem(item, model, setModel)}
          isShowAll={activeFilter === 'Модель'}
          onShowAll={() => onShowAll?.('Модель')}
          limit={11}
        />
      )} */}

      <div className={css.result}>
        {brand && <Chip label={brand?.toString()} onClose={handleSetItem(brand, brand, setBrand)} />}
        {model && <Chip label={model?.toString()} onClose={handleSetItem(model, model, setModel)} />}
        {[brand, model].some(Boolean) && (
          <RegularButton leftIcon={<CloseIcon />} onClick={handleResetAll} variant='text' />
        )}
      </div>
    </div>
  )
}

ByCarFiltersOld.displayName = 'ByCarFilters'
