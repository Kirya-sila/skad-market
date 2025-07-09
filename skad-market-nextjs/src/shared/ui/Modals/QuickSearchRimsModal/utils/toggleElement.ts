export function toggleElement<T>(array: T[], element: T): T[] {
  const index = array.indexOf(element)
  if (index === -1) {
    return [...array, element]
  } else {
    return array.filter((_, i) => i !== index)
  }
}
