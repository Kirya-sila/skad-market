import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { Chip } from '@shared/ui'

export const ChipStory = () => (
  <Section>
    <Title>CHIP</Title>
    {/*PRIMARY*/}
    <Row>
      <Chip label={1} />
      <Chip label={20} />
      <Chip label={2000} />
      <Chip label="label" />
      <Chip label="long label" />
    </Row>
  </Section>
)
