import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { Promo } from '@/widgets/Promo'

export const PromoStory = () => (
  <Section>
    <Title>PROMO</Title>
    {/*PRIMARY*/}
    <Row>
      <Promo />
    </Row>
  </Section>
)
