import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { List } from '@shared/ui/List'

const DEFAULT_PROPS = {
  price: '999 999',
  onClick: () => alert('click price button'),
} as const

export const ListStory = () => (
  <Section>
    <Title>LIST STORY</Title>
    {/*PRIMARY*/}
    <Row>
      <List letter="C" list={['Carens', 'Carnival', 'Ceed', 'Cerato']} />
    </Row>
  </Section>
)
