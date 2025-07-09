import { makeAutoObservable } from 'mobx'

type SnackbarNotification = {
  id: string
  label: string
  subLabel: string
  type?: string
}

class NotificationStore {
  notifications: SnackbarNotification[] = []

  constructor() {
    makeAutoObservable(this)
  }

  addNotification(notification: SnackbarNotification) {
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const limit = isMobile ? 1 : 3
    this.notifications.push(notification)
    while (this.notifications.length > limit) {
      this.notifications.shift()
    }
  }

  removeNotification(id: string, type?: string) {
    this.notifications = this.notifications.filter((notification) => {
      if (type) {
        return !(notification.id === id && notification.type === type)
      }
      return notification.id !== id
    })
  }

  clearNotifications() {
    this.notifications = []
  }

  get hasNotifications() {
    return this.notifications.length > 0
  }

  get lastNotification() {
    return this.notifications.length > 0 ? this.notifications[this.notifications.length - 1] : undefined
  }

  getNotificationById(id: string, type?: string) {
    return this.notifications.find((notification) => notification.id === id && type === notification?.type)
  }
}

export const notificationStore = new NotificationStore()
