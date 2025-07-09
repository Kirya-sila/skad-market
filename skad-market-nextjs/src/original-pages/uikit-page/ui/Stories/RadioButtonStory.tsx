import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { RadioButtonGroup } from '@shared/ui/RadioButtonGroup'

const DEFAULT_PROPS = {
  name: 'uikit',
} as const

const Divider = () => <div style={{ margin: '0 5px' }} />

export const RadioButtonStory = () => (
  <Section>
    <Title>RADIO BUTTONS</Title>
    {/*PRIMARY*/}
    <Row>
      <RadioButtonGroup
        name="uikit"
        radioButtonsData={[
          { id: '1', value: 'one' },
          { id: '2', value: 'two', label: 'Text' },
          { id: '3', value: 'two', disabled: true },
          { id: '4', value: 'two', disabled: true, label: 'Text' },
          { id: '5', value: 'two', error: true },
          { id: '6', value: 'two', label: 'Text', error: true },
        ]}
      />
    </Row>
  </Section>
)
