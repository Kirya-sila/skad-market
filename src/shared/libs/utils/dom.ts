import { EventHandler, SyntheticEvent } from 'react'

export const withStopPropagation =
  <E extends SyntheticEvent>(handler?: EventHandler<E>) =>
  (event: E) => {
    handler?.(event)
    event.stopPropagation()
  }

export const withPreventDefault =
  <E extends SyntheticEvent>(handler?: EventHandler<E>) =>
  (event: E) => {
    event.preventDefault()
    handler?.(event)
  }

export const withPreventDefaultEvents =
  <E extends SyntheticEvent>(handler?: EventHandler<E>) =>
  (event: E) => {
    event.preventDefault()
    handler?.(event)
    event.stopPropagation()
  }
