export const formatDate = (timestamp: number): string => {
  const targetDate = new Date(timestamp)
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  targetDate.setHours(0, 0, 0, 0)

  const dayDiff = (targetDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)

  if (dayDiff === 0) {
    return 'Сегодня'
  } else if (dayDiff === 1) {
    return 'Завтра'
  } else if (dayDiff === 2) {
    return 'Послезавтра'
  } else {
    return new Intl.DateTimeFormat('ru-RU', { month: 'long', day: 'numeric' }).format(targetDate)
  }
}
