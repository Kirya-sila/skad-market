export const arrayToQueryString = (arr: string[], paramName: string): string => {
  return arr.map((item) => `${paramName}=${encodeURIComponent(item)}`).join('&')
}