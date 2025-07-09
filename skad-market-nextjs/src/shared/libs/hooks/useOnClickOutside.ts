import { useEffect, RefObject } from 'react'

type Event = MouseEvent | TouchEvent

/**
 * Хук, позволяющий вызвать колбэк при клике вне элемента (ref)
 * @param refs - реф или массив рефов, клик на которые не должен приводить к вызову handler
 * @param handler - колбэк, который отработает при клике вне элемента
 */
export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  refs: RefObject<T> | RefObject<T>[],
  handler: (event: Event) => void,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!Array.isArray(refs)) {
        const element = refs?.current

        if (element && !element.contains(event.target as Node)) {
          handler(event)
        }

        return
      }

      for (const ref of refs) {
        const element = ref?.current
        if (element && !refs.some((ref) => ref.current && ref.current.contains(event.target as Node))) {
          handler(event)
          break
        }
      }
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [refs, handler])
}
