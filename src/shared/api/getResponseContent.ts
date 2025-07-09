export const getResponseContent = async (response: Response) => {
  let result
  const contentType = response.headers.get('Content-Type')

  switch (true) {
    case contentType?.includes('application/json'):
      result = await response.json()
      break
    case contentType?.includes('application/octet-stream'):
    case contentType?.includes('application/pdf'):
      result = await response.blob()
      break
    default:
      result = await response.text()
  }

  return result
}
