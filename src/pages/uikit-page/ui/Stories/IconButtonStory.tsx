import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { IconButton } from '@shared/ui/IconButton'
import { IconButtonProps } from '@shared/ui/IconButton/IconButton'
import { BurgerIcon, CloseIcon } from '@assets/icons'

const DEFAULT_PROPS: IconButtonProps = {
  icon: <CloseIcon />,
} as const

export const IconButtonStory = () => (
  <Section>
    <Title>ICON BUTTON</Title>
    <Row>
      <IconButton {...DEFAULT_PROPS} />
      <IconButton {...DEFAULT_PROPS} icon={<BurgerIcon />} />
      <IconButton {...DEFAULT_PROPS} />
      <IconButton {...DEFAULT_PROPS} />
      <IconButton {...DEFAULT_PROPS} disabled={true} />
    </Row>
  </Section>
)
