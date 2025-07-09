import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { SkadMarketLogo } from '@shared/ui/SkadMarketLogo'
import { RimsAndTires } from '@shared/ui/RimsAndTires'

export const SkadMarketLogosStory = () => (
  <Section>
    <Title>LOGOS</Title>
    <Row>
      <RimsAndTires />
    </Row>
    <Row>
      <SkadMarketLogo variant="symbolic" />
      <SkadMarketLogo />
    </Row>
    <Row>
      <SkadMarketLogo variant="symbolic" size="middle" />
      <SkadMarketLogo size="middle" />
    </Row>
    <Row>
      <SkadMarketLogo variant="symbolic" size="middle" />
      <SkadMarketLogo size="small" />
    </Row>
  </Section>
)
