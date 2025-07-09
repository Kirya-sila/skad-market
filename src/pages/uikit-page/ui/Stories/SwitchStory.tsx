import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { Switch } from '@shared/ui'
import { useToggle } from '@shared/libs'

export const SwitchStory = () => {
  const [on, toggle] = useToggle()

  return (
    <Section>
      <Title>SWITCH</Title>
      {/*PRIMARY*/}
      <Row>
        <Switch checked={on} toggle={toggle} />
        <Switch checked={on} toggle={toggle} disabled />
      </Row>
    </Section>
  )
}
