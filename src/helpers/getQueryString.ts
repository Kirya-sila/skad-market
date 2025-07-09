export const getQueryFromObject = (filter: Record<string, string>) => {
  const searchParams = new URLSearchParams(filter).toString()
  return `?${searchParams}`
}
