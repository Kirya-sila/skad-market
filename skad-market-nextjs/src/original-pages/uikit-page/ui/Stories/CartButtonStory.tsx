import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { CartButton } from '@shared/ui/CartButton'
import { CartButtonProps } from '@shared/ui/CartButton/CartButton'
import { ArrowRightIcon } from '@assets/icons'

const DEFAULT_PROPS: CartButtonProps = {
  onClick: () => alert('click cart button'),
} as const

export const CartButtonStory = () => (
  <Section>
    <Title>CART BUTTON</Title>
    {/*PRIMARY*/}
    <Row>
      <CartButton {...DEFAULT_PROPS} variant="icon" icon={<ArrowRightIcon />} />
      <CartButton {...DEFAULT_PROPS} icon={<ArrowRightIcon />} />
      <CartButton {...DEFAULT_PROPS} />
      <CartButton {...DEFAULT_PROPS} variant="page" />
      <CartButton {...DEFAULT_PROPS} icon={<ArrowRightIcon />} disabled />
      <CartButton {...DEFAULT_PROPS} disabled />
    </Row>
  </Section>
)
