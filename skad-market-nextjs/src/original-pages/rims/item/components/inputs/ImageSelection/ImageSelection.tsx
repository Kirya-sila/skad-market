import { FC, useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import Slider from 'react-slick'
import css from './ImageSelection.module.scss'
import { Labels } from './Labels'
import { RimDTO } from '@/entities/Rims/model/types'
import { useWindowState } from '@/shared/libs'
import { ImageLoader } from '@/shared/ui/ImageLoader'
import BigImageDetailsModal from '@/shared/ui/Modals/BigImageDetailsModal/BigImageDetailsModal'

type Props = {
  images: RimDTO['images']
  labels: string[]
}

export const ImageSelection: FC<Props> = ({ images, labels }) => {
  const [selected, setSelected] = useState(images[0]?.url)
  const { isMobile, isTablet } = useWindowState()
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setSelected(images[0]?.url)
  }, [images])

  const handleSelected = useCallback((url: string) => {
    setSelected(url)
  }, [])

  const handleModal = () => {
    setModalOpen((prev) => !prev)
  }

  const bigImageModal = () => {
    return (
      modalOpen && (
        <BigImageDetailsModal
          images={images}
          handleSelected={handleSelected}
          selected={selected}
          labels={labels}
          onClose={handleModal}
        />
      )
    )
  }

  if (isMobile || isTablet)
    return (
      <>
        <div className={css.mobileHolder} onClick={handleModal}>
          <Slider dots infinite={images.length > 1} className={css.mobileSlider}>
            {images.map((image) => (
              <div key={`rim-item-mobile-image-${image?.url}`} className={css.mobileImageItem}>
                <ImageLoader src={image?.url} />
              </div>
            ))}
          </Slider>
          <Labels labels={labels} className={css.bigImageLabels} />
        </div>
        {bigImageModal()}
      </>
    )

  return (
    <>
      <div className={css.holder}>
        <div className={css.imagesHolder}>
          {images.map((image) => (
            <button
              key={`btn-image-select-${image?.url}`}
              className={classNames(css.image, selected === image?.url && css.imageSelected)}
              onClick={() => setSelected(image?.url)}
            >
              <ImageLoader src={image?.url} />
            </button>
          ))}
        </div>
        <div className={css.bigImage} onClick={handleModal}>
          <ImageLoader src={selected} />
          <Labels labels={labels} className={css.bigImageLabels} />
        </div>
      </div>
      {bigImageModal()}
    </>
  )
}
