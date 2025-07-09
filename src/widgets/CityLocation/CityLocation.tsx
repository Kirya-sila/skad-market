import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { ConfirmCityTooltip } from '../ConfirmCityTooltip'
import { LocationIcon } from '@/assets/icons'
import { cityStore } from '@/features'
import { MenuButton } from '@/shared/ui'

interface ICityLocation {
  className: string
  type: 'top' | 'bottom'
  handleConfirmCity: VoidFunction
  displayChooseCityModal: VoidFunction
  showConfirmCityTooltip: boolean
}

export const CityLocation: FC<ICityLocation> = observer(
  ({ className, type, handleConfirmCity, displayChooseCityModal, showConfirmCityTooltip }) => {
    const { currentCity, cityConfirmed, locationDetected } = cityStore
    
    if ((currentCity && cityConfirmed) || !locationDetected) {
      return (
        <MenuButton
          size='middle'
          text={currentCity}
          leftIcon={<LocationIcon />}
          onClick={displayChooseCityModal}
          className={className}
        />
      )
    }

    return (
      <>
        {currentCity && (
          <ConfirmCityTooltip
            id={type}
            onConfirm={handleConfirmCity}
            isOpen={showConfirmCityTooltip}
            setIsOpen={handleConfirmCity}
            onChooseOtherCity={displayChooseCityModal}
          >
            <MenuButton
              size='middle'
              text={currentCity}
              leftIcon={<LocationIcon />}
              onClick={displayChooseCityModal}
              className={className}
            />
          </ConfirmCityTooltip>
        )}
      </>
    )
  },
)
