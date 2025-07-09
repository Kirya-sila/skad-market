import { FC } from 'react'
import cn from 'classnames'
import css from './BigImageContent.module.scss'
import { RimDTOImage } from '@/entities/Rims/model/types'
import { Labels } from '@/pages/rims/item/components/inputs/ImageSelection/Labels'
import { ImageLoader } from '@/shared/ui/ImageLoader'

interface IBigImageContent {
  images: RimDTOImage[]
  handleSelected: (url: string) => void
  selected: string
  labels: string[]
}

export const BigImageContent: FC<IBigImageContent> = ({ images, handleSelected, selected, labels }) => {
  return (
    <div className={css.container}>
      <div className={css.imagesList}>
        {images.map((image) => (
          <button
            key={`btn-image-select-${image?.url}`}
            className={cn(css.image, selected === image?.url && css.imageSelected)}
            onClick={() => handleSelected(image?.url)}
          >
            <ImageLoader src={image?.url} />
          </button>
        ))}
      </div>
      <div className={css.bigImage}>
        <ImageLoader src={selected} />
        <Labels labels={labels} className={css.bigImageLabels} />
      </div>
    </div>
  )
}
