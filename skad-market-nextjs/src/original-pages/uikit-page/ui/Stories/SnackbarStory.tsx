import React, { useState } from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { RegularButton, Snackbar } from '@shared/ui'

export const SnackbarStory = () => {
  const [visible, setVisible] = useState(true)

  const hide = () => {
    setVisible(false)
  }

  const show = () => {
    setVisible(true)
  }

  return (
    <Section>
      <Title>SNACK BAR</Title>
      {/*PRIMARY*/}
      <Row>
        <RegularButton
          text={visible ? 'Showing...' : 'Show snackbar'}
          variant="outline"
          size="small"
          appearance="secondary"
          onClick={show}
          disabled={visible}
        />
        <div style={{ position: 'fixed', bottom: '10px', left: '10px' }}>
          <Snackbar visible={visible} label="Шина Michelin Pilot Alpin 5 245/40 R20 99W" hide={hide} />
        </div>
      </Row>
    </Section>
  )
}
