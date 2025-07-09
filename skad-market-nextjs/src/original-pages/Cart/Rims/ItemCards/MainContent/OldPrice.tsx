import { useMemo } from 'react'
import css from '../ItemCards.module.scss'
import { generateRandomRim } from '@/entities/Rims/model/mocks'
import { FlexRow } from '@/shared/ui'

export const OldPrice = () => {
  const mockRim = useMemo(() => generateRandomRim(), [])

  return (
    <FlexRow classname={css.oldPrice}>
      {mockRim.price.old && <span>{mockRim.price.old.toLocaleString()} ₽</span>}
    </FlexRow>
  )
}
