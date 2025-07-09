import { LngLat } from '@yandex/ymaps3-types'
import { DEFAULT_COORDINATES } from '@/constants'

export const getCurrentGeolocation = (): Promise<LngLat> => {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude
          resolve([lat, lon])
          return [lat, lon]
        },
        (error) => {
          console.error(`Error ${error} occured`)
          resolve(DEFAULT_COORDINATES)
          return DEFAULT_COORDINATES
        },
        { enableHighAccuracy: true },
      )
    } else {
      console.warn('Разрешение не получено')
      resolve(DEFAULT_COORDINATES)
      return DEFAULT_COORDINATES
    }
  })
}
