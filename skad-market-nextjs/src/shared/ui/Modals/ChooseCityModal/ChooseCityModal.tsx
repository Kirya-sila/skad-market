import React from 'react'
import css from './ChooseCityModal.module.scss'
import { ModalBaseHeader, RegularButton, SearchInput } from '@shared/ui'
import ModalBase from '@shared/ui/Modals/ModalBase/ModalBase'
import { CITIES } from '@shared/mocks/cities'
import { useInput } from '@shared/libs/hooks/useInput'
import { cityStore } from '@/features/location/model'

export interface ChooseCityModalProps {
  className?: string
  onClose: VoidFunction
}

const POPULAR_CITIES = [
  'Москва',
  'Санкт-Петербург',
  'Казань',
  'Екатеринбург',
  'Новосибирск',
  'Красноярск',
  'Владивосток',
  'Нижний Новгород',
  'Ростов-на-Дону',
  'Краснодар',
]

const ChooseCityModal = ({ className, onClose }: ChooseCityModalProps) => {
  const [cityName, , setCityName] = useInput()

  const handleChooseCity = (city: string) => {
    cityStore.setCurrentCity(city)
    onClose()
  }

  const allCities = CITIES.flatMap(({ cities }) => cities)

  const filteredSuggestions = cityName
    ? allCities.filter((city) => city.toLowerCase().startsWith(cityName.toLowerCase()))
    : []

  const getBody = () => {
    return (
      <div className={css.body}>
        <div className={css.leftSide}>
          <div className={css.title}>Популярные</div>
          <div className={css.items}>
            {POPULAR_CITIES.map((city) => (
              <RegularButton
                key={city}
                text={city}
                variant='text'
                appearance='secondary'
                onClick={() => handleChooseCity(city)}
              />
            ))}
          </div>
        </div>

        <div className={css.rightSide}>
          <div className={css.title}>Алфавитный указатель</div>
          <div className={css.items}>
            {CITIES.map(({ letter, cities }) => (
              <div key={letter} className={css.column}>
                <div className={css.letter}>
                  <RegularButton text={letter} variant='text' size='small' />
                </div>
                <div className={css.items}>
                  {cities.map((city) => (
                    <RegularButton
                      key={city}
                      text={city}
                      variant='text'
                      appearance='secondary'
                      onClick={() => handleChooseCity(city)}
                      size='small'
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <ModalBase
        renderHeader={
          <ModalBaseHeader
            renderTopBarRideSide={
              <SearchInput
                value={cityName}
                onChange={setCityName}
                placeholder='Искать свой город'
                showButton={false}
                className={css.searchInput}
                suggestions={filteredSuggestions}
                onClickSuggestion={handleChooseCity}
              />
            }
            topBar='Выбор города'
            title='Выбор города'
            displayAction
            onClickAction={onClose}
            className={css.header}
            displayMobileTitle={false}
          />
        }
        renderBody={getBody()}
        onClose={onClose}
        className={css.chooseCityModal}
      />
    </div>
  )
}

export default ChooseCityModal

ChooseCityModal.displayName = 'ChooseCityModal'
