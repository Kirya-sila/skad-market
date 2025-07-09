import React from 'react'
import cn from 'classnames'
import css from './TireSelectionByParams.module.scss'
import { SelectionInput } from '@shared/ui/SelectionInput'

interface TireSelectionByParamsProps {
  className?: string
}

const WIDTH_ITEMS = [
  { item: '10.50', value: 'R13' },
  { item: '10.50', value: 'R14' },
  { item: '10.50', value: 'R15' },
  { item: '10.50', value: 'R16' },
  { item: '10.50', value: 'R17' },
  { item: '10.50', value: 'R18' },
  { item: '10.50', value: 'R19' },
  { item: '10.50', value: 'R20' },
  { item: '10.50', value: 'R21' },
]

const PROFILE_ITEMS = [
  { item: '8.5', value: 'R13' },
  { item: '8.5', value: 'R14' },
  { item: '8.5', value: 'R15' },
  { item: '8.5', value: 'R16' },
  { item: '8.5', value: 'R17' },
  { item: '8.5', value: 'R18' },
  { item: '8.5', value: 'R19' },
  { item: '8.5', value: 'R20' },
  { item: '8.5', value: 'R21' },
]

const DIAMETER_ITEMS = [
  { item: '15', value: 'R13' },
  { item: '15', value: 'R14' },
  { item: '15', value: 'R15' },
  { item: '15', value: 'R16' },
  { item: '15', value: 'R17' },
  { item: '15', value: 'R18' },
  { item: '15', value: 'R19' },
  { item: '15', value: 'R20' },
  { item: '15', value: 'R21' },
]

const BRAND_ITEMS = [
  { item: 'Arivo', value: 'R13' },
  { item: 'Arivo', value: 'R14' },
  { item: 'Arivo', value: 'R15' },
  { item: 'Arivo', value: 'R16' },
  { item: 'Arivo', value: 'R17' },
  { item: 'Arivo', value: 'R18' },
  { item: 'Arivo', value: 'R19' },
  { item: 'Arivo', value: 'R20' },
  { item: 'Arivo', value: 'R21' },
]

export const TireSelectionByParams = ({ className }: TireSelectionByParamsProps) => {
  return (
    <div className={cn(css.tireSelectionByParams, className)}>
      <SelectionInput className={css.width} items={WIDTH_ITEMS} placeholder="Ширина" />
      <SelectionInput className={css.profile} items={PROFILE_ITEMS} placeholder="Профиль" />
      <SelectionInput className={css.diameter} items={DIAMETER_ITEMS} placeholder="Диаметр" />
      <SelectionInput className={css.brand} items={BRAND_ITEMS} placeholder="Бренд" />
    </div>
  )
}

TireSelectionByParams.displayName = 'TireSelectionByParams'
