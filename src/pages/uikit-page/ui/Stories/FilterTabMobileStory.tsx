import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { FilterTabMobile } from '@shared/ui'

export const FilterTabMobileStory = () => (
  <Section>
    <Title>FILTER TAB MOBILE</Title>
    {/*PRIMARY*/}
    <Row>
      <FilterTabMobile label={13} enabled />
      <FilterTabMobile label={13} selected />
      <FilterTabMobile label={2000} disabled />
      <FilterTabMobile label="label" enabled />
      <FilterTabMobile label="long label" selected />
    </Row>
  </Section>
)
