import { useCallback, useState } from 'react'

/**
 *
 * @return [state, toggle, setState, setTrue, setFalse]
 */
export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState)

  const toggle = useCallback(() => setState((state) => !state), [])

  const setTrue = useCallback(() => setState(true), [])

  const setFalse = useCallback(() => setState(false), [])

  return [state, toggle, setState, setTrue, setFalse] as const
}

export const useToggleV2 = (initialState = false) => {
  const [state, setState] = useState(initialState)

  const toggle = useCallback(() => setState((state) => !state), [])

  const setTrue = useCallback(() => setState(true), [])

  const setFalse = useCallback(() => setState(false), [])

  return { value: state, toggle, set: setState, on: setTrue, off: setFalse } as const
}
