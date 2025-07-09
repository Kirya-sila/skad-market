export const getUrlWithSearchParams = (
  endpoint: string,
  params?: string | string[][] | Record<string, string | number | null | undefined> | URLSearchParams | undefined,
): string => {
  const updatedParams = Object.fromEntries(
    Object.entries(params ?? {})
      .filter((parameter) => parameter[1] !== null && parameter[1] !== undefined)
      .map(([key, value]) => [key, String(value)]),
  )
  const searchParams = new URLSearchParams(updatedParams).toString()
  return searchParams ? `${endpoint}?${searchParams}` : endpoint
}
