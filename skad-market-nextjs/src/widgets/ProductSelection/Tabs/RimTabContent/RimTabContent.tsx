import { useState } from 'react'
import { CheckboxListItem } from '@shared/ui/CheckboxListItem'
import { RadioButton } from '@shared/ui/RadioButton'
import css from '../../ProductSelection.module.scss'
import { RimSelectionByParams } from '@/widgets/ProductSelection/Tabs/SelectionsGroup'
import { RimSelectionByCar } from '@/widgets/ProductSelection/Tabs/SelectionsGroup/RimSelectionByCar'
import { ParamsButton } from '@/widgets/ProductSelection/UtilityComponents/ParamsButton'
import { SelectionButton } from '@/widgets/ProductSelection/UtilityComponents/SelectionButton'
import { ValidateError } from '@/widgets/ProductSelection/UtilityComponents/ValidateError'
import { TabContentProps } from '@/widgets/ProductSelection/types'

export const RimTabContent = ({ setSelectionType, tabContent }: TabContentProps) => {
  
  const [mountHoleCount, setMountHoleCount] = useState('4')

  const handleChangeMountHoleCount = (count: string) => () => {
    setMountHoleCount(count)
  }

  const getSelectionButton = () => <SelectionButton onClick={tabContent.handleClickSelection} />

  const getMainContent = () => (
    <>
      <div className={css.selections}>{tabContent.isByParams ? <RimSelectionByParams /> : <RimSelectionByCar />}</div>
      {/* {tabContent.isByParams && (
        <div className={css.checkboxes}>
          <div className={css.checkboxesTitle}>Количество крепежных отверстий</div>
          <div className={css.checkboxesBody}>
            {['4', '5', '6'].map((count) => (
              <CheckboxListItem
                key={count}
                label={count}
                checked={mountHoleCount === count}
                onCheck={handleChangeMountHoleCount(count)}
              />
            ))}
          </div>
        </div>
      )} */}
    </>
  )

  const getParamsButton = () => <ParamsButton text='Параметры дисков и как их узнать' />

  const getRadioButtons = () => (
    <div className={css.radioButtons}>
      <RadioButton
        name='rimParams'
        id='1'
        value='by_car'
        label='По автомобилю'
        active={!tabContent.isByParams}
        onCheckRadioButton={() => setSelectionType('by_car')}
      />
      <RadioButton
        name='rimParams'
        id='1'
        value='by_params'
        label='По параметрам'
        active={tabContent.isByParams}
        onCheckRadioButton={() => setSelectionType('by_params')}
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
        {/* {tabContent.isMoreDesktop && getSelectionButton()} */}
      </div>
      <div className={css.secondLine}>
        {!tabContent.isMoreDesktop && getMainContent()}
        {tabContent.isMoreDesktop && getRadioButtons()}
        {tabContent.isMoreDesktop && getParamsButton()}
      </div>
      {/* {!tabContent.isMoreDesktop && <div className={css.thirdLine}>{getSelectionButton()}</div>} */}
    </>
  )
}

RimTabContent.displayName = 'RimTabContent'
