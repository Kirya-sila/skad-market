import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { Brands } from '@/widgets'

const DEFAULT_PROPS = {
  price: '999 999',
  onClick: () => alert('click price button'),
} as const

export const BrandsStory = () => (
  <Section>
    <Title>BRANDS</Title>
    {/*PRIMARY*/}
    <Row>
      <Brands />
    </Row>
  </Section>
)
