import React from 'react'
import css from '../ProductSelection.module.scss'
import { RegularButton } from '@shared/ui/RegularButton'
import { noop } from '@shared/libs'
import { RadioButton } from '@shared/ui/RadioButton'
import { CheckboxListItem } from '@shared/ui/CheckboxListItem'
import { SelectionInput } from '@shared/ui/SelectionInput'
import { RimSelection } from '@/widgets/ProductSelection/Tabs/RimTabContent'
import { useWindowSize } from '@shared/libs/hooks'

export interface TireTabContentProps {
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
  { width: 153, placeholder: 'Ширина' },
  { width: 153, placeholder: 'Профиль' },
  { width: 153, placeholder: 'Диаметр' },
  { width: 153, placeholder: 'Бренд' },
]

const SELECTIONS_BY_CAR = [
  { width: 184, placeholder: 'Марка' },
  { width: 184, placeholder: 'Модель' },
  { width: 184, placeholder: 'Поколение' },
  { width: 306, placeholder: 'Модификация' },
]

export const TireTabContent = ({ rimSelectionType, setRimSelectionType }: TireTabContentProps) => {
  const windowSize = useWindowSize()
  const isByParams = rimSelectionType === 'by_params'
  const getPickupButton = () => <RegularButton onClick={noop} text="Подобрать" />

  const renderSelectionInputs = (selections: any) =>
    selections.map((s: any) => (
      <SelectionInput key={s.placeholder} width={s.width} items={RADIUS_ITEMS} placeholder={s.placeholder} />
    ))

  return (
    <>
      <div className={css.firstLine}>
        <div className={css.selections}>
          {isByParams ? renderSelectionInputs(SELECTIONS_BY_PARAMS) : renderSelectionInputs(SELECTIONS_BY_CAR)}
        </div>
        {isByParams && (
          <div className={css.checkboxes}>
            <div className={css.checkboxesTitle}>Сезонность</div>
            <div className={css.checkboxesBody}>
              <CheckboxListItem label="Все" />
              <CheckboxListItem label="Лето" />
              <CheckboxListItem label="Зима" />
            </div>
          </div>
        )}
        {windowSize.width > 1024 && getPickupButton()}
      </div>

      <div className={css.secondLine}>
        <div className={css.radioButtons}>
          <RadioButton
            name="rimParams"
            id="1"
            value="by_car"
            label="По автомобилю"
            active={!isByParams}
            onCheckRadioButton={() => setRimSelectionType('by_car')}
          />
          <RadioButton
            name="rimParams"
            id="1"
            value="by_params"
            label="По параметрам"
            active={isByParams}
            onCheckRadioButton={() => setRimSelectionType('by_params')}
          />
        </div>
        <RegularButton text="Параметры дисков и как их узнать" onClick={noop} variant="text" appearance="secondary" />
      </div>
    </>
  )
}

TireTabContent.displayName = 'TireTabContent'
