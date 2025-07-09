export const getInfoFromToken = (token: string) => {
  return JSON.parse(atob(token.split('.')[1]))
}
