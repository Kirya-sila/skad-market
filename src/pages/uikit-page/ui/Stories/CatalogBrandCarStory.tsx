import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { BrandButton } from '@shared/ui/CatalogBrandCar'
import {
  ChevroletIcon,
  HavalIcon,
  KIAIcon,
  LADAIcon,
  LexusIcon,
  RenaultIcon,
  ToyotaIcon,
  VolvoIcon,
} from '@assets/icons'

const DEFAULT_PROPS = {
  onClick: () => alert('click brand car'),
} as const

export const CatalogBrandCarStory = () => (
  <Section>
    <Title>BRAND BUTTON</Title>
    <Row>
      <BrandButton {...DEFAULT_PROPS} icon={<KIAIcon />} label="KIA" />
      <BrandButton {...DEFAULT_PROPS} icon={<LADAIcon />} label="LADA" />
      <BrandButton {...DEFAULT_PROPS} icon={<RenaultIcon />} label="Renault" />
      <BrandButton {...DEFAULT_PROPS} icon={<ToyotaIcon />} label="Toyota" />
      <BrandButton {...DEFAULT_PROPS} icon={<HavalIcon />} label="Haval" />
      <BrandButton {...DEFAULT_PROPS} icon={<ChevroletIcon />} label="Chevrolet" />
      <BrandButton {...DEFAULT_PROPS} icon={<LexusIcon />} label="Lexus" />
      <BrandButton {...DEFAULT_PROPS} icon={<VolvoIcon />} label="Volvo" />
    </Row>
  </Section>
)
