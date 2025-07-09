import { makeAutoObservable } from 'mobx'

class ComparisonStore {
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

  isInComparison = (itemId: string): boolean => {
    return this.items.has(itemId)
  }

  toggle(itemId: string) {
    if (this.isInComparison(itemId)) {
      this.remove(itemId)
    } else {
      this.add(itemId)
    }
  }

  get count(): number {
    return this.items.size
  }
}

export const comparisonStore = new ComparisonStore()
