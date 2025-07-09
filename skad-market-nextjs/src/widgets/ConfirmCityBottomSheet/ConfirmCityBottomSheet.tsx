import { FC } from 'react'
import { composeActions } from '@shared/libs'
import { RegularButton } from '@shared/ui'
import { BottomSheet } from '@shared/ui/BottomSheet'
import { observer } from 'mobx-react-lite'
import css from './ConfirmCityBottomSheet.module.scss'
import { cityStore } from '@/features'

interface IConfirmCityBottomSheet {
  handleConfirmCity: VoidFunction
  displayChooseCityModal: VoidFunction
  showConfirmCityTooltip: boolean
}

export const ConfirmCityBottomSheet: FC<IConfirmCityBottomSheet> = observer(
  ({ handleConfirmCity, displayChooseCityModal, showConfirmCityTooltip }) => {
    const { currentCity, cityConfirmed, locationDetected } = cityStore

    const getContent = () => (
      <div className={css.content}>
        <div className={css.title}>
          <span className={css.cityName}> г. {currentCity} </span> Это ваш город?
        </div>
        <div className={css.actions}>
          <RegularButton
            text='Выбрать другой'
            appearance='secondary'
            size='small'
            onClick={composeActions(handleConfirmCity, displayChooseCityModal)}
          />
          <RegularButton text='Да' size='small' onClick={handleConfirmCity} />
        </div>
      </div>
    )

    if ((currentCity && cityConfirmed) || !locationDetected) {
      return null
    }

    return (
      <>
        <BottomSheet
          className={css.confirmCityBottomSheet}
          onClose={handleConfirmCity}
          visibility={showConfirmCityTooltip}
          content={getContent()}
        />
      </>
    )
  },
)

ConfirmCityBottomSheet.displayName = 'ConfirmCityBottomSheet'
