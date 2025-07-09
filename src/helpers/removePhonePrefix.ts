export const removePhonePrefix = (value: string | null | undefined) => {
  return value ? value.slice(2) : ''
}
