import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { CategoryCard } from '@shared/ui/CategoryCard'
import rimImg from '@assets/images/rim_110x110.png'
import { ImageLoader } from '@shared/ui/ImageLoader'

const DEFAULT_PROPS = {
  onClick: () => alert('click price button'),
  label: 'Диски',
  image: <ImageLoader src={rimImg} />,
} as const

export const CategoryCardStory = () => (
  <Section>
    <Title>CATEGORY CARDS</Title>
    {/*PRIMARY*/}
    <Row>
      <CategoryCard {...DEFAULT_PROPS} />
      <CategoryCard {...DEFAULT_PROPS} variant="cart" />
    </Row>
  </Section>
)
