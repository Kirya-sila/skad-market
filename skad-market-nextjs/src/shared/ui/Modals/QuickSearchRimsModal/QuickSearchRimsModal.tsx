import { useMemo, useState } from 'react'
import { ICArrowLeftLine } from '@assets/icons'
import { useToggle, useWindowState } from '@shared/libs'
import { plural } from '@shared/libs/utils/string'
import { ModalBaseHeader, RadioButtonGroup, RegularButton } from '@shared/ui'
import ModalBase from '@shared/ui/Modals/ModalBase/ModalBase'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router'
import css from './QuickSearchRimsModal.module.scss'
import { ByCarFiltersOld } from './components/ByCarFiltersOld'
import { ByParamsFilters } from './components/ByParamsFilters'
import { useToggleElement } from './utils/useToggleElement'
import { appRoutes } from '@/app-settings'
import { quickChoiceByParamsStore } from '@/features/quickChoice/quickChoiceByParamsStore'
import { ByCarFilterContainer } from './components/ByCarFilterContainer/ByCarFilterContainer'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { rimsStore } from '@/entities/Rims'

interface QuickSearchRimsModalProps {
  className?: string
  onClose: VoidFunction
}

const QuickSearchRimsModal = observer(({ className, onClose }: QuickSearchRimsModalProps) => {
  const navigate = useNavigate()
  const { isMobile } = useWindowState()
  const { mobileFiltersByParams, loadMobileRimsData, mobileSelectedParams } = quickChoiceByParamsStore
  const { setCurrentCar, currentCar, activeGeneration } = searchCarStore
  const [step, setStep] = useState('Подбор дисков')
  const [searchParam, setSearchParam] = useState('by_params')
  const [foundProductCounts, setFoundProductCounts] = useState(100)
  const [isShowAll, toggleShowAll, , showAll, hideAll] = useToggle(false)
  const [activeFilter, setActiveFilter] = useState('')
  const { selectedItems, handleToggle, resetFilters } = useToggleElement({
    initialFilters: mobileFiltersByParams,
    mobileSelectedParams,
  })

  const handleShowAll = (filterName: string) => {
    setActiveFilter(filterName)
    showAll()
  }

  const handleReset = () => {
    setStep('Подбор дисков')
    setActiveFilter('')
    hideAll()
  }

  const pluralizeProductWord = plural(foundProductCounts, ['товар', 'товара', 'товаров'])
  const foundProductButtonLabel = `Подобрать`

  const handleChangeSearchParam = (id: string) => {
    setSearchParam(id)
  }

  const handleGetFilteredItems = async () => {
    if (searchParam === 'by_params') {
      await loadMobileRimsData(selectedItems)
    } else {
      await rimsStore.loadSpecifiedCarRimParams({ CarId: currentCar?.id })
      if (currentCar) {
        setCurrentCar(currentCar)
      }
    }
    navigate(appRoutes.rims)
    onClose()
  }

  const ParamsRadioButtons = () => (
    <RadioButtonGroup
      className={css.paramsRadioButtons}
      activeId={searchParam}
      onChange={handleChangeSearchParam}
      name='uikit'
      radioButtonsData={[
        { id: 'by_car', value: 'by_car', label: 'По автомобилю' },
        { id: 'by_params', value: 'by_params', label: 'По параметрам' },
      ]}
    />
  )

  const getFilters = () => {
    switch (searchParam) {
      case 'by_params':
        return (
          <ByParamsFilters
            filters={mobileFiltersByParams}
            onShowAll={handleShowAll}
            activeFilter={activeFilter}
            onReset={handleReset}
            handleToggle={handleToggle}
            resetFilters={resetFilters}
            selectedItems={selectedItems}
          />
        )
      case 'by_car':
        // return <ByCarFilters onShowAll={handleShowAll} activeFilter={activeFilter} onReset={handleReset} />
        return <ByCarFilterContainer />
    }
  }

  const getBody = () => {
    return (
      <div className={css.body}>
        {!isShowAll && <ParamsRadioButtons />}
        <div className={css.filters}>{getFilters()}</div>
      </div>
    )
  }

  const buttonSubmitDisabled = useMemo(() => !activeGeneration, [activeGeneration])

  const getFooter = () => {
    return (
      // <div className={css.footer}>
      <RegularButton
        text={foundProductButtonLabel}
        fullWidth
        onClick={handleGetFilteredItems}
        disabled={searchParam === 'by_params' ? false : buttonSubmitDisabled}
      />
      // </div>
    )
  }

  return (
    <div className={cn(css.quickSearchRimsModal, className)}>
      <ModalBase
        renderHeader={
          <ModalBaseHeader
            className={css.modalHeader}
            renderTopBarLeftSide={
              isShowAll ? (
                <RegularButton leftIcon={<ICArrowLeftLine />} variant='text' onClick={handleReset} />
              ) : undefined
            }
            topBar={isShowAll ? activeFilter : step}
            title={step}
            displayAction
            onClickAction={onClose}
            displayMobileTitle={false}
          />
        }
        renderBody={getBody()}
        onClose={onClose}
        renderFooter={getFooter()}
      />
    </div>
  )
})

export default QuickSearchRimsModal

QuickSearchRimsModal.displayName = 'QuickSearchRimsModal'
