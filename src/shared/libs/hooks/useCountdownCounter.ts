import { useCallback, useEffect, useState } from 'react'

interface UseCountdownCounterProps {
  startValue: number
  endValue: number
  interval: number
  onEnd?: () => void
}

interface CountdownCounterReturn {
  current: number
  restart: () => void
  stop: () => void
  reset: (newValue: number) => void
}

/**
 * Хук для создания обратного отсчета.
 *
 * @param {Object} params Параметры хука.
 * @param {number} params.startValue Начальное значение таймера.
 * @param {number} params.endValue Конечное значение таймера.
 * @param {number} params.interval Интервал в миллисекундах между обновлениями таймера.
 * @param {Function} [params.onEnd] Функция, вызываемая при достижении таймером конечного значения.
 * @returns {CountdownCounterReturn} Возвращает объект с текущим значением таймера, функцией для перезапуска и функцией для остановки таймера.
 */
export const useCountdownCounter = ({
  startValue,
  endValue,
  interval,
  onEnd,
}: UseCountdownCounterProps): CountdownCounterReturn => {
  const [current, setCurrent] = useState(startValue)
  const [isActive, setIsActive] = useState(false)

  const stop = useCallback(() => {
    setIsActive(false)
  }, [])

  const restart = useCallback(() => {
    setCurrent(startValue)
    setIsActive(true)
  }, [startValue])

  // Функция для сброса текущего значения таймера
  const reset = useCallback((newValue: number) => {
    setCurrent(newValue)
    setIsActive(true) // Активируем таймер с новым значением
  }, [])

  useEffect(() => {
    if (!isActive) return

    if (current === endValue) {
      stop()
      onEnd?.()
      return
    }

    const timerId = setInterval(() => {
      setCurrent((prevCurrent) => prevCurrent + (startValue > endValue ? -1 : 1))
    }, interval)

    return () => clearInterval(timerId)
  }, [current, isActive, startValue, endValue, interval, onEnd, stop])

  useEffect(() => {
    setIsActive(true)
    // Очищаем активность таймера при размонтировании компонента
    return () => setIsActive(false)
  }, [])

  return { current, restart, stop, reset }
}
