import React, { CSSProperties } from 'react'
import css from '../ProductSelection.module.scss'
import { SelectionInput } from '@shared/ui/SelectionInput'
import { CheckboxListItem } from '@shared/ui/CheckboxListItem'
import { RegularButton } from '@shared/ui/RegularButton'
import { noop } from '@shared/libs'
import { RadioButton } from '@shared/ui/RadioButton'
import { useWindowSize } from '@shared/libs/hooks'

export type RimSelection = 'by_params' | 'by_car'

export interface RimTabContentProps {
  rimSelectionType: RimSelection
  setRimSelectionType: (rimSelectionType: RimSelection) => void
}

const RADIUS_ITEMS = [
  { item: 'R13', value: 'R13' },
  { item: 'R14', value: 'R14' },
  { item: 'R15', value: 'R15' },
  { item: 'R16', value: 'R16' },
  { item: 'R17', value: 'R17' },
  { item: 'R18', value: 'R18' },
  { item: 'R19', value: 'R19' },
  { item: 'R20', value: 'R20' },
  { item: 'R21', value: 'R21' },
]

const SELECTIONS_BY_PARAMS = [
  { width: 150, placeholder: 'Диаметр' },
  { width: 150, placeholder: 'Вылет' },
  { width: 186, placeholder: 'Крепёж LZxPCD' },
  { width: 150, placeholder: 'Ширина' },
]

const SELECTIONS_BY_CAR = [
  { width: 184, placeholder: 'Марка' },
  { width: 184, placeholder: 'Модель' },
  { width: 184, placeholder: 'Поколение' },
  { width: 306, placeholder: 'Модификация' },
]

const CheckboxLabels = ['4', '5', '6']

export const RimTabContent = ({ rimSelectionType, setRimSelectionType }: RimTabContentProps) => {
  const windowSize = useWindowSize()
  const isMoreDesktop = windowSize.width > 1024
  const isByParams = rimSelectionType === 'by_params'
  const getParamsButton = () => (
    <RegularButton text='Параметры дисков и как их узнать' onClick={noop} variant='text' appearance='secondary' />
  )
  const getPickupButton = (style?: CSSProperties) => <RegularButton style={style} onClick={noop} text='Подобрать' />
  const getRadioButtons = () => (
    <div className={css.radioButtons}>
      <RadioButton
        name='rimParams'
        id='1'
        value='by_car'
        label='По автомобилю'
        active={!isByParams}
        onCheckRadioButton={() => setRimSelectionType('by_car')}
      />
      <RadioButton
        name='rimParams'
        id='1'
        value='by_params'
        label='По параметрам'
        active={isByParams}
        onCheckRadioButton={() => setRimSelectionType('by_params')}
      />
    </div>
  )

  const getMainContent = () => (
    <>
      {!isMoreDesktop && getRadioButtons()}
      <div className={css.selections}>
        {isByParams ? renderSelectionInputs(SELECTIONS_BY_PARAMS) : renderSelectionInputs(SELECTIONS_BY_CAR)}
      </div>
      {isByParams && (
        <div className={css.checkboxes}>
          <div className={css.checkboxesTitle}>Количество крепежных отверстий</div>
          <div className={css.checkboxesBody}>{renderCheckboxes()}</div>
        </div>
      )}
    </>
  )

  const renderSelectionInputs = (selections: any) =>
    selections.map((s: any) => (
      <SelectionInput key={s.placeholder} width={s.width} items={RADIUS_ITEMS} placeholder={s.placeholder} />
    ))

  const renderCheckboxes = () => CheckboxLabels.map((label) => <CheckboxListItem key={label} label={label} />)

  return (
    <>
      <div className={css.firstLine}>
        {isMoreDesktop && getMainContent()}
        {isMoreDesktop && getPickupButton()}
      </div>

      <div className={css.secondLine}>
        {!isMoreDesktop && getMainContent()}
        {isMoreDesktop && getRadioButtons()}
        {isMoreDesktop && getParamsButton()}
      </div>
      <div className={css.thirdLine}>{!isMoreDesktop && getPickupButton()}</div>
    </>
  )
}

RimTabContent.displayName = 'RimTabContent'
