import React, { FC, useMemo } from 'react'
import css from '../ItemCards.module.scss'
import { generateRandomRim } from '@/entities/Rims/model/mocks'
import { PromoButton } from '@/shared/ui'

export const PromoByttons = () => {
  const mockRim = useMemo(() => generateRandomRim(), [])

  return (
    <div className={css.promoButtons}>
      {mockRim.labels.map(
        ({ label }) =>
          label && <PromoButton key={label} label={label} variant={label === 'Новинки' ? 'primary' : 'secondary'} />,
      )}
    </div>
  )
}
