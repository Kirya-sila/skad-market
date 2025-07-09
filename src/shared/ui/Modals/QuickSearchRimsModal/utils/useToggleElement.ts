import { useState } from 'react'
import { quickChoiceByParamsStore } from '@/features/quickChoice/quickChoiceByParamsStore'
import { IMobileFilterParams, IMobileRimSpecifications, RimSpecifications } from '@/interfaces'

interface ToggleElementProps {
  initialFilters: IMobileFilterParams[]
  mobileSelectedParams: IMobileRimSpecifications
}

export const useToggleElement = ({ initialFilters, mobileSelectedParams }: ToggleElementProps) => {
  const { getMobileAvailableParams } = quickChoiceByParamsStore
  const [selectedItems, setSelectedItems] = useState<Record<RimSpecifications, number[]>>(() => {
    if (mobileSelectedParams) {
      return mobileSelectedParams
    } else {
      const initialState = {} as Record<RimSpecifications, number[]>
      initialFilters.forEach((filter) => {
        initialState[filter.name] = []
      })
      return initialState
    }
  })

  const handleToggle = (name: RimSpecifications, value: number) => () => {
    const currentArray = selectedItems[name] || []
    const index = currentArray.indexOf(value)
    const newArray =
      index === -1 ? [...currentArray, value] : currentArray.filter((item) => item !== value)
    const currentlySelected = { ...selectedItems, [name]: newArray }

    setSelectedItems(currentlySelected)
    getMobileAvailableParams(currentlySelected)
  }

  const resetFilters = () => {
    setSelectedItems(() => {
      const resetState = {} as Record<RimSpecifications, number[]>
      initialFilters.forEach((filter) => {
        resetState[filter.name] = []
      })
      return resetState
    })
  }

  return { selectedItems, handleToggle, resetFilters }
}
