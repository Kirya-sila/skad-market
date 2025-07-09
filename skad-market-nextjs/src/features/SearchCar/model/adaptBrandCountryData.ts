import { CountryEntry } from '@/features/SearchCar/model/types'

export const adaptData = (data: { countryName: string; brands: string[] }[]): CountryEntry[] => {
  if (!data) {
    return []
  }
  return data.map((country) => {
    const entriesMap: { [key: string]: string[] } = {}

    country.brands.forEach((brand) => {
      const firstLetter = brand[0].toUpperCase()
      if (!entriesMap[firstLetter]) {
        entriesMap[firstLetter] = []
      }
      entriesMap[firstLetter].push(brand)
    })

    const entries: [string, string[]][] = Object.entries(entriesMap).map(([letter, brands]) => [letter, brands])

    return {
      title: country.countryName,
      entries,
    }
  })
}
