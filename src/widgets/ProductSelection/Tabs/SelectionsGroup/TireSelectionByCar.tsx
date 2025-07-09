import React from 'react'
import cn from 'classnames'
import css from './TireSelectionByCar.module.scss'
import { SelectionInput } from '@shared/ui/SelectionInput'

interface TireSelectionByCarProps {
  className?: string
}

const BRAND_ITEMS = [
  { item: 'KIA', value: 'R13' },
  { item: 'KIA', value: 'R14' },
  { item: 'KIA', value: 'R15' },
  { item: 'KIA', value: 'R16' },
  { item: 'KIA', value: 'R17' },
  { item: 'KIA', value: 'R18' },
  { item: 'KIA', value: 'R19' },
  { item: 'KIA', value: 'R20' },
  { item: 'KIA', value: 'R21' },
]

const MODEL_ITEMS = [
  { item: 'RIO', value: '35' },
  { item: 'RIO', value: '36' },
  { item: 'RIO', value: '37' },
  { item: 'RIO', value: '38' },
  { item: 'RIO', value: '39' },
  { item: 'RIO', value: '40' },
  { item: 'RIO', value: '41' },
  { item: 'RIO', value: '42' },
  { item: 'RIO', value: '43' },
]

const GENERATION_ITEMS = [
  { item: '2020-н.в.', value: '35' },
  { item: '2020-н.в.', value: '36' },
  { item: '2020-н.в.', value: '37' },
  { item: '2020-н.в.', value: '38' },
  { item: '2020-н.в.', value: '39' },
  { item: '2020-н.в.', value: '40' },
  { item: '2020-н.в.', value: '41' },
  { item: '2020-н.в.', value: '42' },
  { item: '2020-н.в.', value: '43' },
]

const MODIFICATIONS_ITEMS = [
  { item: '4х дверный седан FB_2FL', value: '35' },
  { item: '4х дверный седан FB_2FL', value: '36' },
  { item: '4х дверный седан FB_2FL', value: '37' },
  { item: '4х дверный седан FB_2FL', value: '38' },
  { item: '4х дверный седан FB_2FL', value: '39' },
  { item: '4х дверный седан FB_2FL', value: '40' },
  { item: '4х дверный седан FB_2FL', value: '41' },
  { item: '4х дверный седан FB_2FL', value: '42' },
  { item: '4х дверный седан FB_2FL', value: '43' },
]

export const TireSelectionByCar = ({ className }: TireSelectionByCarProps) => {
  return (
    <div className={cn(css.tireSelectionByCar, className)}>
      <SelectionInput className={css.brand} items={BRAND_ITEMS} placeholder="Марка" />
      <SelectionInput className={css.model} items={MODEL_ITEMS} placeholder="Модель" />
      <SelectionInput className={css.generation} items={GENERATION_ITEMS} placeholder="Поколение" />
      <SelectionInput className={css.modification} items={MODIFICATIONS_ITEMS} placeholder="Модификация" />
    </div>
  )
}

TireSelectionByCar.displayName = 'TireSelectionByCar'
