import { useMemo } from 'react'
import { ICSmallBubbleFilled, ICStarFilled } from '@assets/icons'
import cn from 'classnames'
import css from './ProductAvailabilityAndReviews.module.scss'

interface ProductAvailabilityAndReviewsProps {
  className?: string
  rating?: string
  reviews?: number
  count?: number
}

export const ProductAvailabilityAndReviews = ({
  className,
  rating,
  reviews,
  count = 0,
}: ProductAvailabilityAndReviewsProps) => {
  const hasReviews = reviews !== undefined && reviews > 0

  const getAvailabilityText = useMemo(() => {
    switch (true) {
      case count === 0:
        return 'Нет в наличии'
      case count >= 4:
        return 'В наличии'
      default:
        return `Осталось ${count}`
    }
  }, [count])

  return (
    <div className={cn(css.productAvailabilityAndReviews, className, { [css.alignLeft]: !count })}>
      <div className={css.column}>
        <div className={cn(css.remaining)}>{getAvailabilityText}</div>
      </div>
      {/* <div className={css.column}>
        {rating && (
          <div className={css.rating}>
            <ICStarFilled />
            <span className={css.ratingAmount}>{rating}</span>
          </div>
        )}
        {hasReviews && (
          <div className={css.reviews}>
            <ICSmallBubbleFilled />
            <span className={css.reviewAmount}>{reviews}</span>
          </div>
        )}
      </div> */}
    </div>
  )
}

ProductAvailabilityAndReviews.displayName = 'ProductAvailabilityAndReviews'
