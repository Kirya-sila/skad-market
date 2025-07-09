export const copyToClipboard = (text: string): boolean => {
  if (navigator?.clipboard && text) {
    navigator.clipboard.writeText(text)

    return true
  }

  return false
}
