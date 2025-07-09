import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { About } from '@/widgets/About'

export const AboutStory = () => (
  <Section>
    <Title>ABOUT</Title>
    {/*PRIMARY*/}
    <Row>
      <About />
    </Row>
  </Section>
)
