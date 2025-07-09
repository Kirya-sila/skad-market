import { currentModal } from '@app/config/modal/current-modal'
import { Modals } from '@app/config/modal/modals-confg'
import { DEFAULT_CURRENT_CITY, handleCatchedError, localStorageManager } from '@shared/libs'
import { makeAutoObservable } from 'mobx'

const YANDEX_API_KEY = import.meta.env.VITE_YANDEX_API_KEY

class CityStore {
  currentCity = localStorageManager.getItem<string>('currentCity')
  cityConfirmed = localStorageManager.getItem<boolean>('cityConfirmed') || false
  locationDetected = false

  constructor() {
    makeAutoObservable(this)
  }

  confirmCurrentCity = () => {
    localStorageManager.setItem('cityConfirmed', true)
    this.cityConfirmed = true
  }

  setCurrentCity = (city: string) => {
    this.currentCity = city
    this.confirmCurrentCity()

    localStorageManager.setItem('currentCity', city)
  }

  requestCurrentCity = () => {
    const onClose = () => currentModal.set(null)
    currentModal.set({
      name: Modals.ChooseCity,
      props: {
        onClose,
      },
    })
  }

  detectCurrentCity = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getCityByCoordinates(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.error('Ошибка определения геолокации', error)
          this.locationDetected = true
          this.currentCity = DEFAULT_CURRENT_CITY
          localStorageManager.setItem('currentCity', DEFAULT_CURRENT_CITY)
        },
      )
    } else {
      console.error('Геолокация не поддерживается этим браузером')
      this.setCurrentCity(DEFAULT_CURRENT_CITY)
    }
  }

  initCurrentCity = () => {
    if (!this.currentCity) {
      this.detectCurrentCity()

      return
    }
  }

  getCityByCoordinates = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://maps`,
      )
      const data = await response.json()

      const featureMember = data.response.GeoObjectCollection.featureMember

      const localityObject = featureMember.find(
        (member: any) => member.GeoObject.metaDataProperty.GeocoderMetaData.kind === 'locality',
      )

      if (localityObject) {
        const city = localityObject.GeoObject.name
        this.setCurrentCity(city)
      } else {
        this.setCurrentCity(DEFAULT_CURRENT_CITY)
      }
    } catch (e) {
      handleCatchedError(e)
      this.setCurrentCity(DEFAULT_CURRENT_CITY)
    } finally {
      this.locationDetected = true
    }
  }
}

export const cityStore = new CityStore()
