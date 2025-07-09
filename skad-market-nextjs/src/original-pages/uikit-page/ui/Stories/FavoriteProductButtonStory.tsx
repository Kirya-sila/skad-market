import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { FavoriteProductButton } from '@shared/ui/FavoriteProductButton'
import { useToggle } from '@shared/libs'

const DEFAULT_PROPS = {
  onClick: () => alert('click favorite button'),
} as const

export const FavoriteProductButtonStory = () => {
  const [active, toggle] = useToggle()
  const [active1, toggle1] = useToggle()

  return (
    <Section>
      <Title>FAVORITE PRODUCT BUTTON</Title>
      {/*PRIMARY*/}
      <Row>
        <FavoriteProductButton {...DEFAULT_PROPS} active={active} onClick={toggle} />
        <FavoriteProductButton {...DEFAULT_PROPS} active={active1} onClick={toggle1} />
      </Row>
    </Section>
  )
}
