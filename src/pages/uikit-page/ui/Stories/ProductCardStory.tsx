import { useState } from 'react'
import productCardImageSrc3 from '@assets/images/product_card_image_3.png'
import productCardImageSrc4 from '@assets/images/product_card_image_4.png'
import productCardImageSrc5 from '@assets/images/product_card_image_5.png'
import productCardImageSrc6 from '@assets/images/product_card_image_6.png'
import productCardImageSrc7 from '@assets/images/product_card_image_7.png'
import { useToggle } from '@shared/libs'
import { ImageLoader } from '@shared/ui/ImageLoader'
import { ProductCard, ProductCardProps } from '@shared/ui/ProductCard'
import { Section, Title } from '@/pages/uikit-page/ui/common'
import { Colors } from '@/shared/types'

const DEFAULT_PROPS: Omit<ProductCardProps, 'wheelCode'> = {
  title: 'Шина Michelin Pilot Alpin 5 245/40 R20 99W',
  renderTitleHeader: <ProductCard.Price currentPrice={250330} oldPrice={717430} supTitle='Распродажа' />,
  renderBottomActions: (
    <ProductCard.BottomAction productId='1' totalQuantity={10} addItemToCart={(count) => alert(`В корзину добавлено ${count} товара`)} />
  ),
  renderTitleFooter: <ProductCard.ProductAvailabilityAndReviews rating='4,5' reviews={23} />,
  images: [
    <ImageLoader src={productCardImageSrc3} />,
    <ImageLoader src={productCardImageSrc4} />,
    <ImageLoader src={productCardImageSrc5} />,
    <ImageLoader src={productCardImageSrc6} />,
    <ImageLoader src={productCardImageSrc7} />,
  ],
  labels: [
    {
      label: 'Черная пятница',
    },
    { label: 'Новинки', variant: 'primary' },
  ],
  availableColors: [Colors.DarkSilver, Colors.Black, Colors.DiamondBlack],
} as const

export const ProductCardStory = () => {
  const [activeColor1, setActiveColor1] = useState(Colors.DiamondBlack)
  const [isFavorite1, toggleFavorite1] = useToggle()
  const [isComparison1, toggleComparison1] = useToggle()

  const [activeColor2, setActiveColor2] = useState(Colors.DiamondBlack)
  const [isFavorite2, toggleFavorite2] = useToggle()
  const [isComparison2, toggleComparison2] = useToggle()

  const [activeColor3, setActiveColor3] = useState(Colors.DiamondBlack)
  const [isFavorite3, toggleFavorite3] = useToggle()
  const [isComparison3, toggleComparison3] = useToggle()

  return (
    <Section>
      <Title>PRODUCT CARD</Title>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <ProductCard
          {...DEFAULT_PROPS}
          wheelCode='1'
          activeColor={activeColor1}
          onChangeColor={setActiveColor1}
          isFavorite={isFavorite1}
          onFavorite={toggleFavorite1}
          isComparison={isComparison1}
          onComparison={toggleComparison1}
        />
        <ProductCard
          {...DEFAULT_PROPS}
          wheelCode='2'
          available={false}
          renderTitleHeader={<ProductCard.Price currentPrice={250330} />}
          renderBottomActions={<ProductCard.BottomAction productId='1' totalQuantity={0} />}
          renderTitleFooter={<ProductCard.ProductAvailabilityAndReviews rating='4,5' reviews={23} count={0} />}
          activeColor={activeColor2}
          onChangeColor={setActiveColor2}
          isFavorite={isFavorite2}
          onFavorite={toggleFavorite2}
          isComparison={isComparison2}
          onComparison={toggleComparison2}
        />
        <ProductCard
          {...DEFAULT_PROPS}
          wheelCode='3'
          activeColor={activeColor3}
          onChangeColor={setActiveColor3}
          isFavorite={isFavorite3}
          onFavorite={toggleFavorite3}
          isComparison={isComparison3}
          onComparison={toggleComparison3}
        />
      </div>
    </Section>
  )
}
