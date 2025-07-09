import React, { useCallback, useEffect, useState } from 'react'
import css from './PriceRange.module.scss'
import { RangeSlider, TextInput } from '@shared/ui'
import { useInput } from '@shared/libs/hooks/useInput'
import { clampValue, parseAsNumber, parseNumeric } from './utils'
import { FilterProps } from '@/entities/Rims/ui/FilterBar/types'
import { observer } from 'mobx-react-lite'
import { debounce } from '@shared/libs'
import { rimsStore } from '@entities/Rims/model/rimsStore'

export const PriceRange = observer(({ filter }: FilterProps) => {
  const [{ value: min }, { value: max }] = filter.values || []
  const { setPrice } = rimsStore

  const minNumber = Number(min)
  const maxNumber = Number(max)

  const [start, setStart, changeStart] = useInput({
    formatValue: parseNumeric,
    initialValue: parseNumeric(String(min)),
  })

  const [end, setEnd, changeEnd] = useInput({
    formatValue: parseNumeric,
    initialValue: parseNumeric(String(max)),
  })

  const debouncedFilter = useCallback(debounce(setPrice, 500), [])

  useEffect(() => {
    debouncedFilter([parseAsNumber(start), parseAsNumber(end)])
  }, [start, end, debouncedFilter])

  const [sliderValues, setSliderValues] = useState([minNumber, maxNumber])

  useEffect(() => {
    setSliderValues([parseAsNumber(start), parseAsNumber(end)])
  }, [start, end])

  const handleRangeChange = (value: number[] | number) => {
    if (!Array.isArray(value)) return

    changeStart(value[0].toLocaleString('ru-RU'))
    changeEnd(value[1].toLocaleString('ru-RU'))
    setSliderValues(value)
  }

  const handleBlur = (change: Function, value: string) => () => {
    const clampedValue = clampValue(parseAsNumber(value), minNumber, maxNumber)
    change(clampedValue.toLocaleString('ru-RU'))
  }

  return (
    <div className={css.priceRange}>
      <div className={css.title}>Цена</div>
      <div className={css.topLine}>
        <TextInput
          className={css.price}
          type="text"
          onChange={setStart}
          value={start}
          size="small"
          onBlur={handleBlur(changeStart, start)}
        />
        <TextInput
          className={css.priceEnd}
          type="text"
          onChange={setEnd}
          value={end}
          size="small"
          onBlur={handleBlur(changeEnd, end)}
        />
      </div>
      <RangeSlider min={1} max={600000} value={sliderValues} onChange={handleRangeChange} />
    </div>
  )
})

PriceRange.displayName = 'PriceRange'
