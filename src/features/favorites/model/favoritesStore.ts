import { makeAutoObservable } from 'mobx'

class FavoritesStore {
  items = new Set<string>()

  constructor() {
    makeAutoObservable(this)
  }

  add(itemId: string) {
    this.items.add(itemId)
  }

  remove(itemId: string) {
    this.items.delete(itemId)
  }

  isInFavorites = (itemId: string): boolean => {
    return this.items.has(itemId)
  }

  toggle(itemId: string) {
    if (this.isInFavorites(itemId)) {
      this.remove(itemId)
    } else {
      this.add(itemId)
    }
  }

  get count(): number {
    return this.items.size
  }
}

export const favoritesStore = new FavoritesStore()
