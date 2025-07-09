import { useState } from 'react'
import productCardImageSrc3 from '@assets/images/product_card_image_3.png'
import productCardImageSrc4 from '@assets/images/product_card_image_4.png'
import productCardImageSrc5 from '@assets/images/product_card_image_5.png'
import productCardImageSrc6 from '@assets/images/product_card_image_6.png'
import productCardImageSrc7 from '@assets/images/product_card_image_7.png'
import { useToggle } from '@shared/libs'
import { RegularButton } from '@shared/ui'
import { ImageLoader } from '@shared/ui/ImageLoader'
import { ProductCard, ProductCardProps } from '@shared/ui/ProductCard'
import { Tooltip } from '@shared/ui/Tooltip'
import { Label, Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { Colors } from '@/shared/types'

const DEFAULT_PROPS = {
  price: '999 999',
  onClick: () => alert('click tooltip story'),
} as const

const ProductCardContent = () => {
  const [activeColor3, setActiveColor3] = useState(Colors.DiamondBlack)
  const [isFavorite3, toggleFavorite3] = useToggle()
  const [isComparison3, toggleComparison3] = useToggle()

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
    availableColors: [Colors.Black, Colors.DarkSilver, Colors.DiamondBlack],
  } as const

  return (
    <div style={{ width: 200 }}>
      <ProductCard
        {...DEFAULT_PROPS}
        wheelCode='1'
        activeColor={activeColor3}
        onChangeColor={setActiveColor3}
        isFavorite={isFavorite3}
        onFavorite={toggleFavorite3}
        isComparison={isComparison3}
        onComparison={toggleComparison3}
      />
    </div>
  )
}

export const TooltipStory = () => (
  <Section>
    <Title>TOOLTIP</Title>
    {/*PRIMARY*/}
    <Label>plain text:</Label>
    <Row>
      <Tooltip id='1' text='asdsad' content='Tooltips' place='top'>
        <div>Hover me (top)</div>
      </Tooltip>
      <Tooltip id='2' content='Tooltipasd' place='right'>
        <div>Hover me (right)</div>
      </Tooltip>
      <Tooltip id='3' content='Tooltip' place='bottom'>
        <div>Hover me (bottom)</div>
      </Tooltip>
      <Tooltip id='4' content='Tooltip' place='left'>
        <div>Hover me (left)</div>
      </Tooltip>
      <Tooltip id='44' content='Tooltip' place='top-start'>
        <div>Hover me (top-start)</div>
      </Tooltip>
      <Tooltip id='444' content='Tooltip' place='top-end'>
        <div>Hover me (top-end)</div>
      </Tooltip>
    </Row>
    <Row>
      <Tooltip id='5' content='Tooltip' place='top' openOnClick>
        <div>Click me (top)</div>
      </Tooltip>
      <Tooltip id='6' content='Tooltip' place='right' openOnClick>
        <div>Click me (right)</div>
      </Tooltip>
      <Tooltip id='7' content='Tooltip' place='bottom' openOnClick>
        <div>Click me (bottom)</div>
      </Tooltip>
      <Tooltip id='8' content='Tooltip' place='left' openOnClick>
        <div>Click me (left)</div>
      </Tooltip>
      <Tooltip id='88' content='Tooltip' place='top-start' openOnClick>
        <div>Hover me (top-start)</div>
      </Tooltip>
      <Tooltip id='888' content='Tooltip' place='top-end' openOnClick>
        <div>Hover me (top-end)</div>
      </Tooltip>
    </Row>
    <Label>rich content:</Label>
    <Row>
      <Tooltip id='9' content={<ProductCardContent />} place='top' openOnClick clickable>
        <RegularButton text='click me (top)' size='middle' appearance='secondary' />
      </Tooltip>
      <Tooltip id='10' content={<ProductCardContent />} place='right' openOnClick clickable>
        <RegularButton text='click me (right)' size='middle' appearance='secondary' />
      </Tooltip>
      <Tooltip id='11' content={<ProductCardContent />} place='bottom' openOnClick clickable>
        <RegularButton text='click me (bottom)' size='middle' appearance='secondary' />
      </Tooltip>
      <Tooltip id='12' content={<ProductCardContent />} place='left' openOnClick clickable>
        <RegularButton text='click me (left)' size='middle' appearance='secondary' />
      </Tooltip>
    </Row>
  </Section>
)
