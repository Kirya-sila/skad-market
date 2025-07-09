import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { PromoButton } from '@shared/ui'

const DEFAULT_PROPS = {
  label: 'Label',
  onClick: () => alert('label click'),
} as const

export const PromoButtonStory = () => (
  <Section>
    <Title>PROMO BUTTON</Title>
    <Row>
      <PromoButton {...DEFAULT_PROPS} variant="primary" />
      <PromoButton {...DEFAULT_PROPS} />
    </Row>
  </Section>
)
