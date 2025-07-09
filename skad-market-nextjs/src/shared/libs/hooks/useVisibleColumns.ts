import { useState } from 'react'

export const useVisibleColumns = <T extends string | number>(columns: Record<T, string>): [T[], (value: T) => void] => {
  const [visibleColumns, setVisibleColumns] = useState<T[]>(Object.keys(columns) as T[])

  const handleColumns = (value: T) => {
    if (visibleColumns.includes(value)) {
      setVisibleColumns((visibleColumns) => visibleColumns.filter((column) => column !== value))
    } else {
      const visibleCols = [...visibleColumns, value]
      const filtered = Object.keys(columns).filter((item) => visibleCols.includes(item as T)) as T[]
      setVisibleColumns(filtered)
    }
  }

  return [visibleColumns, handleColumns]
}
