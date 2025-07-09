import React, { useRef } from 'react'
import cn from 'classnames'
import css from './Promo.module.scss'
import { ICArrowRightLine } from '@assets/icons'
import { ImageLoader } from '@shared/ui/ImageLoader'
import image1 from '@assets/images/promo_banner_image_1.png'
import image2 from '@assets/images/promo_banner_image_2.png'
import image3 from '@assets/images/promo_banner_image_3.png'
import image4 from '@assets/images/promo_banner_image_4.png'
import image5 from '@assets/images/promo_banner_image_5.png'

interface BannerCardProps extends Banner {
  variant: 'large' | 'small'
}

type Color = 'green' | 'gray' | 'orange' | 'lightestGray' | 'yellow'
type Background = 'blackFriday' | 'freeShipping' | 'firstPurchase' | 'installPlan' | 'gift'

interface Banner {
  color: Color // 'green', 'gray', 'orange', 'lightestGray', 'yellow'
  background: Background // 'blackFriday', 'freeShipping', 'firstPurchase', 'installPlan', 'gift'
  label: string
  title: string
  image: string
  variant: 'large' | 'small'
}

const bannerMocks: Banner[] = [
  {
    color: 'green',
    background: 'blackFriday',
    image: image1,
    label: 'Акция действует с 20.11 по 30.11',
    title: 'Черная пятница скидки до 75%',
    variant: 'large',
  },
  {
    color: 'gray',
    background: 'freeShipping',
    image: image2,
    label: 'Бессрочная акция',
    title: 'Бесплатная доставка по России',
    variant: 'large',
  },
  {
    color: 'orange',
    background: 'firstPurchase',
    image: image3,
    label: 'Бессрочная акция',
    title: 'Любой аксессуар в подарок при первой покупке',
    variant: 'small',
  },
  {
    color: 'lightestGray',
    background: 'installPlan',
    image: image4,
    label: 'Бессрочная акция',
    title: 'Рассрочка на литые диски',
    variant: 'small',
  },
  {
    color: 'yellow',
    background: 'gift',
    image: image5,
    label: 'Акция действует до 31.12',
    title: 'Стеклоомывающая жидкость в подарок',
    variant: 'small',
  },
]

const BannerCard: React.FC<BannerCardProps> = ({ variant, label, title, image, color, background }) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const scrollToCard = () => {
    // cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  return (
    <div className={cn(css[color], css[background], css[variant])} ref={cardRef} onClick={scrollToCard}>
      <div className={css.bannerLabel}>{label}</div>
      <div className={css.bannerTitle}>{title}</div>
      <ImageLoader className={css.bannerImage} src={image} />
    </div>
  )
}

interface PromoProps {
  className?: string
}

export const Promo: React.FC<PromoProps> = ({ className }) => (
  <div className={cn(css.promo, className)}>
    <div className={css.header}>
      <div className={css.title}>Акции</div>
      <button className={css.expand}>
        Смотреть все акции
        <ICArrowRightLine />
      </button>
    </div>
    <div className={css.body}>
      <div className={css.topRow}>
        {bannerMocks.slice(0, 2).map((data, index) => (
          <BannerCard key={index} {...data} variant="large" />
        ))}
      </div>
      <div className={css.bottomRow}>
        {bannerMocks.slice(2).map((data, index) => (
          <BannerCard key={index} {...data} variant="small" />
        ))}
      </div>
    </div>
  </div>
)

Promo.displayName = 'Promo'
