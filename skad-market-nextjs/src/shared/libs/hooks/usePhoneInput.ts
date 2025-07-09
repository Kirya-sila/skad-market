import { useState } from 'react'

export const usePhoneInput = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let onlyNums = event.target.value.replace(/[^\d]/g, '')
    if (onlyNums.length > 11) {
      onlyNums = onlyNums.substring(0, 11)
    }

    let formattedValue = ''
    if (onlyNums.length <= 1) {
      formattedValue = onlyNums
    } else if (onlyNums.length <= 4) {
      formattedValue = `+7 (${onlyNums.substring(1)}`
    } else if (onlyNums.length <= 7) {
      formattedValue = `+7 (${onlyNums.substring(1, 4)}) ${onlyNums.substring(4)}`
    } else if (onlyNums.length <= 9) {
      formattedValue = `+7 (${onlyNums.substring(1, 4)}) ${onlyNums.substring(4, 7)}-${onlyNums.substring(7)}`
    } else {
      formattedValue = `+7 (${onlyNums.substring(1, 4)}) ${onlyNums.substring(4, 7)}-${onlyNums.substring(
        7,
        9,
      )}-${onlyNums.substring(9)}`
    }

    setValue(formattedValue)
  }

  return [value, handleChange] as const
}
