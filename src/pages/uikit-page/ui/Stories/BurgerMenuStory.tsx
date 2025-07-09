import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { BurgerMenu } from '@/widgets'
import { useToggle } from '@shared/libs'
import { BurgerIcon } from '@assets/icons'
import { IconButton } from '@shared/ui/IconButton'

export const BurgerMenuStory = () => {
  const [isShow, toggle, , show, hide] = useToggle(false)

  return (
    <Section>
      <Title>BURGER MENU</Title>
      {/*PRIMARY*/}
      <Row>
        <IconButton onClick={show} icon={<BurgerIcon />} /> show menu
        <BurgerMenu isShow={isShow} onHide={hide} />
      </Row>
    </Section>
  )
}
