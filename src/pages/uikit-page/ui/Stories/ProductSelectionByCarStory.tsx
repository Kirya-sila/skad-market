import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { ProductSelectionByCar } from '@/widgets/ProductSelectionByCar'

const DEFAULT_PROPS = {
  onClickFindCar: () => alert('click selection by car'),
} as const

export const ProductSelectionByCarStory = () => (
  <Section>
    <Title>PRODUCT SELECTION BY CAR</Title>
    {/*PRIMARY*/}
    <Row>
      <ProductSelectionByCar {...DEFAULT_PROPS} />
    </Row>
  </Section>
)
