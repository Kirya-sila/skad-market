import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { useToggle } from '@shared/libs'
import { ComparisonProductButton } from '@shared/ui/ComparisonProductButton'

const DEFAULT_PROPS = {
  onClick: () => alert('click comparison button'),
} as const

export const ComparisonProductButtonStory = () => {
  const [active, toggle] = useToggle()
  const [active1, toggle1] = useToggle()

  return (
    <Section>
      <Title>COMPARISON PRODUCT BUTTON</Title>
      {/*PRIMARY*/}
      <Row>
        <ComparisonProductButton {...DEFAULT_PROPS} active={active} onClick={toggle} />
        <ComparisonProductButton {...DEFAULT_PROPS} active={active1} onClick={toggle1} />
      </Row>
    </Section>
  )
}
