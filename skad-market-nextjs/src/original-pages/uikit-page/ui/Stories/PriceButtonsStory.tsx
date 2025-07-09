import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { PriceButton } from '@shared/ui/PriceButton'

const DEFAULT_PROPS = {
  price: '999 999',
  onClick: () => alert('click price button'),
} as const

export const PriceButtonsStory = () => (
  <Section>
    <Title>PRICE BUTTONS</Title>
    {/*PRIMARY*/}
    <Row>
      <PriceButton {...DEFAULT_PROPS} />
      <PriceButton {...DEFAULT_PROPS} disabled={true} />
    </Row>
  </Section>
)
