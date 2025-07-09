import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { CheckboxListItemSmall, Divider } from '@shared/ui'

export const CheckboxListItemSmallStory = () => (
  <Section>
    <Title>CHECKBOX LIST ITEM SMALL</Title>
    {/*PRIMARY*/}
    <Row>
      <CheckboxListItemSmall />
      <CheckboxListItemSmall label="Text" />
      <Divider />
      <CheckboxListItemSmall disabled />
      <CheckboxListItemSmall label="Text" disabled />
      <Divider />
      <CheckboxListItemSmall error />
      <CheckboxListItemSmall label="Text" error />
    </Row>
  </Section>
)
