import React, { useEffect, useState } from 'react'

interface UseInputConfig {
  initialValue?: string
  formatValue?: (value: string) => string
}

export const useInput = ({ initialValue = '', formatValue }: UseInputConfig = {}) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    if (initialValue && initialValue !== value) setValue(initialValue)
  }, [initialValue])

  const setValueAction = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatValue ? formatValue(e.target.value) : e.target.value
    setValue(value)
  }

  const clearValue = () => setValue('')

  const setInitialValue = () => setValue(initialValue)

  const onChange = (value: string) => setValue(value)

  return [value, setValueAction, onChange, clearValue, setInitialValue] as const
}
