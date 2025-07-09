import { useState } from 'react'
import { CheckboxListItem } from '@shared/ui/CheckboxListItem'
import { RadioButton } from '@shared/ui/RadioButton'
import css from '../../ProductSelection.module.scss'
import { SelectionBy } from '../../constants'
import { TireSelectionByCar } from '@/widgets/ProductSelection/Tabs/SelectionsGroup/TireSelectionByCar'
import { TireSelectionByParams } from '@/widgets/ProductSelection/Tabs/SelectionsGroup/TireSelectionByParams'
import { ParamsButton } from '@/widgets/ProductSelection/UtilityComponents/ParamsButton'
import { SelectionButton } from '@/widgets/ProductSelection/UtilityComponents/SelectionButton'
import { ValidateError } from '@/widgets/ProductSelection/UtilityComponents/ValidateError'
import { TabContentProps } from '@/widgets/ProductSelection/types'

export const TireTabContent = ({ setSelectionType, tabContent }: TabContentProps) => {
  // const { isValidateError, handleClickSelection, isMoreDesktop, isByParams } = useTabContent(selectionType)
  const [season, setSeason] = useState('Все')

  const handleChangeSeason = (season: string) => () => {
    setSeason(season)
  }

  const getSelectionButton = () => <SelectionButton onClick={tabContent.handleClickSelection} />

  const getMainContent = () => (
    <>
      <div className={css.selections}>{tabContent.isByParams ? <TireSelectionByParams /> : <TireSelectionByCar />}</div>
      {tabContent.isByParams && (
        <div className={css.checkboxes}>
          <div className={css.checkboxesTitle}>Сезонность</div>
          <div className={css.checkboxesBody}>
            {['Все', 'Лето', 'Зима'].map((s) => (
              <CheckboxListItem key={s} label={s} checked={s === season} onCheck={handleChangeSeason(s)} />
            ))}
          </div>
        </div>
      )}
    </>
  )

  const getParamsButton = () => <ParamsButton text='Параметры шин и как их узнать' />

  const getRadioButtons = () => (
    <div className={css.radioButtons}>
      <RadioButton
        name='tireParams'
        id='1'
        value={SelectionBy.byCar}
        label='По автомобилю'
        active={!tabContent.isByParams}
        onCheckRadioButton={() => setSelectionType(SelectionBy.byCar)}
      />
      <RadioButton
        name='tireParams'
        id='1'
        value={SelectionBy.byParams}
        label='По параметрам'
        active={tabContent.isByParams}
        onCheckRadioButton={() => setSelectionType(SelectionBy.byParams)}
      />
    </div>
  )

  return (
    <>
      <ValidateError isValidateError={tabContent.isValidateError} />

      <div className={css.firstLine}>
        {!tabContent.isMoreDesktop && getRadioButtons()}
        {!tabContent.isMoreDesktop && getParamsButton()}
        {tabContent.isMoreDesktop && getMainContent()}
        {tabContent.isMoreDesktop && getSelectionButton()}
      </div>
      <div className={css.secondLine}>
        {!tabContent.isMoreDesktop && getMainContent()}
        {tabContent.isMoreDesktop && getRadioButtons()}
        {tabContent.isMoreDesktop && getParamsButton()}
      </div>
      {!tabContent.isMoreDesktop && <div className={css.thirdLine}>{getSelectionButton()}</div>}
    </>
  )
}

TireTabContent.displayName = 'TireTabContent'
