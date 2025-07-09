import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { CheckboxListItem } from '@shared/ui/CheckboxListItem'

const DEFAULT_PROPS = {
  price: '999 999',
  onClick: () => alert('click price button'),
} as const

const Divider = () => <div style={{ margin: '0 5px' }} />

export const CheckboxListItemStory = () => (
  <Section>
    <Title>CHECKBOX LIST ITEMS</Title>
    {/*PRIMARY*/}
    <Row>
      <CheckboxListItem />
      <CheckboxListItem label="Text" />
      <Divider />
      <CheckboxListItem disabled />
      <CheckboxListItem label="Text" disabled />
      <Divider />
      <CheckboxListItem error />
      <CheckboxListItem label="Text" error />
    </Row>
  </Section>
)
