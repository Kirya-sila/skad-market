import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { SelectionInput } from '@shared/ui/SelectionInput'

// const DEFAULT_PROPS = {
//   price: "999 999",
//   onClick: () => alert("click price button"),
// } as const;

export const SelectionInputStory = () => {
  const selectionOptions = [
    { item: 'R13', value: 'R13' },
    { item: 'R14', value: 'R14' },
    { item: 'R15', value: 'R15' },
    { item: 'R16', value: 'R16' },
    { item: 'R17', value: 'R17' },
    { item: 'R18', value: 'R18' },
    { item: 'R19', value: 'R19' },
    { item: 'R20', value: 'R20' },
    { item: 'R21', value: 'R21' },
  ]

  const selectionOptions2 = [
    { item: '10', value: '10' },
    { item: '20', value: '20' },
    { item: '30', value: '30' },
    { item: '40', value: '40' },
  ]

  return (
    <Section>
      <Title>SELECTION INPUTS</Title>
      {/*PRIMARY*/}
      <Row>
        <div style={{ width: '100%', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <SelectionInput width={150} placeholder="Диаметр" items={selectionOptions} />
          <SelectionInput width={300} mode="multiple" placeholder="MultiSelect" items={selectionOptions} />
          <SelectionInput width={150} error={true} placeholder="Error input" items={selectionOptions2} />
          <SelectionInput width={150} disabled={true} placeholder="Disabled" items={selectionOptions} />
        </div>
      </Row>
    </Section>
  )
}
