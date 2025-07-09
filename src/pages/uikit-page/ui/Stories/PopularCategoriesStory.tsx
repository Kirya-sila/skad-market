import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { PopularCategories } from '@/widgets'

export const PopularCategoriesStory = () => (
  <Section>
    <Title>POPULAR CATEGORIES</Title>
    {/*PRIMARY*/}
    <Row>
      <PopularCategories />
    </Row>
  </Section>
)
