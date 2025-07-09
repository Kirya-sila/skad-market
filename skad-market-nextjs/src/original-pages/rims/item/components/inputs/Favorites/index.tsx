import { FC } from 'react'

import css from './Favorites.module.scss'
import { Heart } from '@/assets/icons'

type Props = {
  withLabel?: boolean
}

export const Favorites: FC<Props> = ({ withLabel }) => (
  <div className={css.actionItem}>
    <span className={css.heartIcon}>
      <Heart />
    </span>
    {withLabel && <span>В избранное</span>}
  </div>
)
