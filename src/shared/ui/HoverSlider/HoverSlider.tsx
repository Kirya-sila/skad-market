import { ReactNode, useRef } from 'react'
import Slider, { Settings } from '@ant-design/react-slick'
import { getDeviceType } from '@shared/libs/utils/getDeviceType'
import { ImageLoader } from '@shared/ui/ImageLoader'

interface HoverSliderProps {
  className?: string
  images: ReactNode[]
}

const settings: Settings = {
  speed: 0,
  dots: true,
  fade: false,
  swipe: true,
  arrows: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
}

export const HoverSlider = ({ images }: HoverSliderProps) => {
  const sliderRef = useRef<Slider>(null)
  const deviceType = getDeviceType()

  if (deviceType !== 'desktop') {
    const mobileSetting = { ...settings, speed: 500 }

    return (
      <Slider {...mobileSetting}>{images?.length > 0 ? [...images] : <ImageLoader key={1} src={undefined} />}</Slider>
    )
  }

  const handleMouseEnter = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* for ref */}
      {/* @ts-ignore */}
      <Slider ref={sliderRef} {...settings}>
        {images?.length > 0 ? [...images] : <ImageLoader key={1} src={undefined} />}
      </Slider>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          display: 'flex',
        }}
      >
        {images.map((_, index) => (
          <div
            key={index}
            style={{ flex: 1, height: '100%' }}
            onMouseEnter={() => handleMouseEnter(index)}
          />
        ))}
      </div>
    </div>
  )
}

HoverSlider.displayName = 'HoverSlider'
