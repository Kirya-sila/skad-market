import { FC } from 'react'
import css from './Comprassion.module.scss'
import { ComparisonIcon } from '@/assets/icons'

type Props = {
  withLabel?: boolean
}

export const Comprassion: FC<Props> = ({ withLabel }) => (
  <div className={css.actionItem}>
    <span className={css.comparisonIcon}>
      <ComparisonIcon />
    </span>
    {withLabel && <span>К сравнению</span>}
  </div>
)
