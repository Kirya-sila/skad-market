export const parseNumeric = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, '')
  return numericValue.length ? parseInt(numericValue, 10).toLocaleString('ru-RU') : ''
}

export const parseAsNumber = (str: string): number => Number(str.replace(/\s/g, ''))

export const clampValue = (value: number, bound1: number, bound2: number): number => {
  const min = Math.min(bound1, bound2)
  const max = Math.max(bound1, bound2)
  return Math.min(Math.max(value, min), max)
}

export const localizeColor = {
  DiamondWhite: 'Алмаз, белый',
  DiamondMatte: 'Алмаз, матовый',
  DiamondBlack: 'Алмаз, черный',
  Silver: 'Серебристый',
  DarkSilver: 'Темно-серебристый',
}

const invertObject = (obj: Record<string, string>): Record<string, string> => {
  const invertedObject: Record<string, string> = {}
  Object.entries(obj).forEach(([key, value]) => {
    invertedObject[value] = key
  })
  return invertedObject
}

export const invertedLocalizeColor = invertObject(localizeColor)
