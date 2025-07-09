import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import cn from 'classnames'
import css from './SnackBarRenderer.module.scss'
import { notificationStore } from '@/features/notification/model'
import { Snackbar } from '@shared/ui'
import { favoritesStore } from '@/features/favorites/model'
import { comparisonStore } from '@/features/comparison/model'

interface SnackBarRendererProps {
  className?: string
}

export const SnackBarRenderer = observer(({ className }: SnackBarRendererProps) => {
  const [visibleStates, setVisibleStates] = useState<{ [id: string]: boolean }>({})

  const notificationsString = JSON.stringify(notificationStore.notifications.map((n) => n.id + n?.type))

  useEffect(() => {
    const newVisibleStates = notificationStore.notifications.reduce(
      (acc, notification) => {
        acc[notification.id + notification.type] = true
        return acc
      },
      {} as { [id: string]: boolean },
    )

    setVisibleStates(newVisibleStates)
  }, [notificationsString])

  const hide = (id: string, type?: string) => {
    setVisibleStates((prev) => ({ ...prev, [id + type]: false }))
    setTimeout(() => {
      notificationStore.removeNotification(id, type)
    }, 500)
  }

  return (
    <div className={cn(css.snackBarRenderer, className)}>
      {notificationStore.notifications.map((notification) => {
        return (
          <Snackbar
            key={notification.id + notification?.type}
            visible={visibleStates[notification.id + notification?.type]}
            label={notification.label}
            subLabel={notification.subLabel || ''}
            hide={() => hide(notification.id, notification.type)}
            onCancel={() => {
              if (notification?.type === 'favorite') {
                favoritesStore.remove(notification.id)
              }
              if (notification?.type === 'comparison') {
                comparisonStore.remove(notification.id)
              }
              hide(notification.id, notification.type)
            }}
          />
        )
      })}
    </div>
  )
})

SnackBarRenderer.displayName = 'SnackBarRenderer'
