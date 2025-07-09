import { FC } from 'react'
import classNames from 'classnames'
import { Comprassion, Favorites, ImageSelection } from '../../inputs'

import css from './ImagesBody.module.scss'
import { RimDTO } from '@/entities/Rims/model/types'
import { useWindowState } from '@/shared/libs'

type Props = {
  labels: string[]
  images: RimDTO['images']
  features: string[]
  id: unknown
  className?: string
}

export const ImagesBody: FC<Props> = ({ features, images, labels, id, className }) => {
  const { isTablet, isMobile } = useWindowState()

  return (
    <div className={classNames(css.imageBodyItem, className)}>
      <ImageSelection images={images} labels={labels} />
      {/* {(isTablet || isMobile) && (
        <div className={css.actions}>
          <Favorites />
          <Comprassion />
        </div>
      )} */}
      <div className={classNames(css.features, (isTablet || isMobile) && css.featuresSmall)}>
        {features.map((x) => (
          <div key={`rim-${id}-features-${x}`} className={css.featureItem}>
            {x}
          </div>
        ))}
      </div>
    </div>
  )
}
