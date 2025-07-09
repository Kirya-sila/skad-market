import React, { useState } from 'react'
import cn from 'classnames'
import css from './QuickSearchRimsModal.module.scss'
import ModalBase from '@shared/ui/Modals/ModalBase/ModalBase'
import { ModalBaseHeader, RadioButtonGroup, RegularButton } from '@shared/ui'
import { plural } from '@shared/libs/utils/string'
import { useToggle } from '@shared/libs'
import { ByCarFiltersOld } from './components/ByCarFiltersOld'
import { ByParamsFilters } from './components/ByParamsFilters'
import { ICArrowLeftLine } from '@assets/icons'
import { PARAMETERS_TIRES_FILTERS } from '@shared/ui/Modals/QuickSearchRimsModal/utils/mocks'

interface QuickSearchRimsModalProps {
  className?: string
  onClose: VoidFunction
}

const QuickSearchTiresModal = ({ className, onClose }: QuickSearchRimsModalProps) => {
  const [step, setStep] = useState('Подбор шин')
  const [searchParam, setSearchParam] = useState('by_params')
  const [foundProductCounts, setFoundProductCounts] = useState(100)
  const [isShowAll, toggleShowAll, , showAll, hideAll] = useToggle(false)
  const [activeFilter, setActiveFilter] = useState('')

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
  const foundProductButtonLabel = `Показать ${foundProductCounts} ${pluralizeProductWord}`

  const handleChangeSearchParam = (id: string) => {
    setSearchParam(id)
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
      // case 'by_params':
      //   return (
      //     <ByParamFilters
      //       filters={PARAMETERS_TIRES_FILTERS}
      //       onShowAll={handleShowAll}
      //       activeFilter={activeFilter}
      //       onReset={handleReset}
      //     />
      //   )
      case 'by_car':
        return <ByCarFiltersOld onShowAll={handleShowAll} activeFilter={activeFilter} onReset={handleReset} />
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

  const getFooter = () => {
    return (
      <div className={css.footer}>
        <RegularButton text={foundProductButtonLabel} fullWidth />
      </div>
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
}

export default QuickSearchTiresModal

QuickSearchTiresModal.displayName = 'QuickSearchRimsModal'
