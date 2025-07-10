'use client'

import { ReactNode } from 'react'
import { PromoButton, PromoButtonProps } from '@shared/ui'
import { ColorFilter } from '@shared/ui/ColorFilter/ColorFilter'
import { HoverSlider } from '@shared/ui/HoverSlider'
import { ProductAvailabilityAndReviews } from '@shared/ui/ProductCard/ProductAvailabilityAndReviews'
import cn from 'classnames'
import NextLink from 'next/link'
import { BottomAction } from './BottomAction'
import { Price } from './Price'
import css from './ProductCard.module.scss'
import { appRoutes } from '@/app-settings'
import { Colors } from '@/shared/types'
import { Flex } from 'antd'

export interface ProductCardProps {
  wheelCode: string | undefined
  title: string
  className?: string
  available?: boolean
  images?: ReactNode[]
  activeColor?: Colors
  isFavorite?: boolean
  isComparison?: boolean
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  availableColors?: Colors[]
  onFavorite?: VoidFunction
  labels?: PromoButtonProps[]
  onComparison?: VoidFunction
  renderTitleHeader?: ReactNode
  renderTitleFooter?: ReactNode
  renderBottomActions?: ReactNode
  onChangeColor?: (color: Colors) => void
  fromCatalog?: boolean
}

export const ProductCard = ({
  wheelCode = '',
  title,
  onClick,
  className,
  onFavorite,
  labels = [],
  images = [],
  activeColor,
  onComparison,
  onChangeColor,
  availableColors,
  available = true,
  renderTitleHeader,
  renderTitleFooter,
  isFavorite = false,
  renderBottomActions,
  isComparison = false,
  fromCatalog = false,
}: ProductCardProps) => {
  return (
    <Flex vertical style={{ padding: 12, borderRadius: 20 }}>
      <div className={cn(css.productCard, className, { [css.notAvailable]: !available })} /* onClick={onClick} */>
        <NextLink
          className={css.link}
          href={appRoutes.rimsItem.replace(':wheelCode', wheelCode)}
          onClick={onClick}
        >
          <div className={css.thumbnail}>
            <div className={css.labels}>
              {labels.map((label) => (
                <PromoButton key={label.label} {...label} />
              ))}
            </div>
            {/* <div className={css.actionIcons}>
        <ComparisonProductButton onClick={onComparison} active={isComparison} />
        <FavoriteProductButton onClick={onFavorite} active={isFavorite} />
      </div> */}
            <div className={css.sliderWrapper}>
              {availableColors && (
                <div className={css.colors}>
                  {availableColors?.map((color) => (
                    <ColorFilter
                      key={color}
                      color={color}
                      available={available}
                      onChange={onChangeColor}
                      active={color === activeColor}
                    />
                  ))}
                </div>
              )}
              <div className={css.slider}>
                <HoverSlider images={images} />
              </div>
            </div>
          </div>
          <div className={css.body}>
            {renderTitleHeader}

            <div className={css.title}>{title}</div>
          </div>
          {renderTitleFooter}
          <div className={css.action}>{renderBottomActions}          </div>
        </NextLink>
      </div>
    </Flex>
  )
}

ProductCard.Price = Price
ProductCard.BottomAction = BottomAction
ProductCard.ProductAvailabilityAndReviews = ProductAvailabilityAndReviews

ProductCard.displayName = 'ProductCard'
