import { FC, ReactNode } from 'react'
import cn from 'classnames'
import Slider, { Settings } from 'react-slick'
import css from './Swiper.module.scss'

export interface SwiperProps {
  initialSlide?: number
  className?: string
  frames: ReactNode[]
  onSetSlickToGo?: (slider: Slider | null) => void
  isInfinite?: boolean
  onSlideChange?: (currentSlide: number, nextSlide: number) => void
  isArrows?: boolean
}

export const Swiper: FC<SwiperProps> = ({
  initialSlide = 0,
  className,
  frames,
  onSetSlickToGo,
  isInfinite = true,
  onSlideChange,
  isArrows = true,
}) => {
  if (frames?.length === 0) return null

  const settings: Settings = {
    initialSlide,
    dots: false,
    infinite: isInfinite,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    swipeToSlide: true,
    swipe: true,
    beforeChange: onSlideChange,
    arrows: isArrows,
    // prevArrow: <SliderLeftArrow className={css.prevArrow} />,
    // nextArrow: <SliderRightArrow className={css.nextArrow} />,
    // afterChange: onSlideChange,
  }

  return (
    <div className={cn(css.swiper, className)}>
      <Slider
        ref={(slider: Slider | null) => {
          if (onSetSlickToGo) {
            onSetSlickToGo(slider)
          }
        }}
        {...settings}
      >
        {...frames}
      </Slider>
    </div>
  )
}

Swiper.displayName = 'Swiper'
