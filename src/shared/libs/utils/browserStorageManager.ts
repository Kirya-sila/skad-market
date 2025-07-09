import { safeJSONParse } from './guards'

class BrowserStorageManager {
  constructor(private storage: Storage = window.localStorage) {
    if (storage === window.sessionStorage) {
      this.clear()
    }
  }

  setItem = <Value extends unknown>(key: string, value: Value) => {
    try {
      return this.storage.setItem(key, JSON.stringify(value))
    } catch (error) {
      return error
    }
  }

  getItem = <Value extends unknown>(key: string): Value | null => {
    const item = this.storage.getItem(key)

    if (item) {
      return safeJSONParse(item)
    }

    return null
  }

  removeItem = (key: string) => {
    this.storage.removeItem(key)
  }

  clear = () => {
    this.storage.clear()
  }
}

export const localStorageManager = new BrowserStorageManager()

export const sessionStorageManager = new BrowserStorageManager(window.sessionStorage)
