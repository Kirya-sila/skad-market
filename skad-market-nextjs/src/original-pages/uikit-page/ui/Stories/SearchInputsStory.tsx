import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { SearchInput } from '@shared/ui/SearchInput'

const DEFAULT_PROPS = {
  value: '',
  onChange: () => null,
} as const

export const SearchInputsStory = () => (
  <Section>
    <Title>SEARCH INPUTS</Title>
    {/*PRIMARY*/}
    <Row>
      <SearchInput {...DEFAULT_PROPS} />
    </Row>
  </Section>
)
