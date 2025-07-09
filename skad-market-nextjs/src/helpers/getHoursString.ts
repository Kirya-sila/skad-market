export const getHoursString = (hours: number) => {
  const remainder = hours % 10
  if (remainder === 1) {
    return ` Остался ${hours} час`
  }
  if (remainder === 0 || remainder > 4) {
    return ` Осталось ${hours} часов`
  }

  return ` Осталось ${hours} часа`
}
