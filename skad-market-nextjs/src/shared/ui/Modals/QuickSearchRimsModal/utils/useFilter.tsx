import { useCallback, useState } from 'react'

type FilterValue = string | number

type Filters = {
  [filterName: string]: FilterValue[]
}

function toggleElement<T>(array: T[], element: T): T[] {
  const index = array.indexOf(element)
  if (index === -1) {
    return [...array, element]
  } else {
    return array.filter((_, i) => i !== index)
  }
}

export function useFilters(initialFilters: Filters): [Filters, (filterName: string, value: FilterValue) => void] {
  const [filters, setFilters] = useState<Filters>(initialFilters)

  const toggleFilter = useCallback((filterName: string, value: FilterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: toggleElement(prevFilters[filterName], value),
    }))
  }, [])

  return [filters, toggleFilter]
}
