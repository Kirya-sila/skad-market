import React from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { BottomSheet } from '@shared/ui/BottomSheet'
import { useToggle } from '@shared/libs'
import { RegularButton } from '@shared/ui'

export const BottomSheetStory = () => {
  const [isShow, toggle, set, show, hide] = useToggle()

  return (
    <Section>
      <Title>BOTTOM SHEET</Title>
      {/*PRIMARY*/}
      <Row>
        <RegularButton text="Open bottom sheet" onClick={show} />
        <BottomSheet
          onClose={hide}
          visibility={isShow}
          content={
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <RegularButton text="Да" appearance="secondary" />
              <RegularButton text="Нет" />
              <RegularButton text="Не знаю" appearance="secondary" />
            </div>
          }
        />
      </Row>
    </Section>
  )
}
