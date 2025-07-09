import { Months } from './../constants/months'

export const getOrderDateString = (date: Date | null) => {
  const parsedDate = new Date(date || Date.now())

  const day = parsedDate.getDate()
  const month = Months[parsedDate.getMonth()]
  return `${day} ${month}`
}
