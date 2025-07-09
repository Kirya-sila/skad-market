import React from 'react'
import { LocationIcon } from '@assets/icons/LocationIcon'
import { RegularButton } from '@shared/ui/RegularButton'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'

const DEFAULT_PROPS = {
  size: 'large',
  appearance: 'primary',
  leftIcon: <LocationIcon />,
  text: 'Button',
  onClick: () => alert('click regular button'),
  variant: 'filled',
} as const

export const RegularButtonsStory = () => (
  <Section>
    <Title>REGULAR BUTTONS</Title>
    {/*PRIMARY*/}
    <Row>
      <RegularButton {...DEFAULT_PROPS} />
      <RegularButton {...DEFAULT_PROPS} disabled={true} />
      <RegularButton {...DEFAULT_PROPS} leftIcon={undefined} />
      <RegularButton {...DEFAULT_PROPS} leftIcon={undefined} disabled={true} />
      <RegularButton {...DEFAULT_PROPS} text={undefined} />
      <RegularButton {...DEFAULT_PROPS} text={undefined} disabled={true} />
    </Row>
    <Row>
      <RegularButton {...DEFAULT_PROPS} size='middle' />
      <RegularButton {...DEFAULT_PROPS} size='middle' disabled={true} />
      <RegularButton {...DEFAULT_PROPS} size='middle' leftIcon={undefined} />
      <RegularButton {...DEFAULT_PROPS} size='middle' leftIcon={undefined} disabled={true} />
      <RegularButton {...DEFAULT_PROPS} size='middle' text={undefined} />
      <RegularButton {...DEFAULT_PROPS} size='middle' text={undefined} disabled={true} />
    </Row>

    {/*SECONDARY*/}
    <Row>
      <RegularButton {...DEFAULT_PROPS} appearance='secondary' />
      <RegularButton {...DEFAULT_PROPS} appearance='secondary' disabled={true} />
      <RegularButton {...DEFAULT_PROPS} appearance='secondary' leftIcon={undefined} />
      <RegularButton {...DEFAULT_PROPS} appearance='secondary' leftIcon={undefined} disabled={true} />
      <RegularButton {...DEFAULT_PROPS} appearance='secondary' text={undefined} />
      <RegularButton {...DEFAULT_PROPS} appearance='secondary' text={undefined} disabled={true} />
    </Row>
    <Row>
      <RegularButton {...DEFAULT_PROPS} size='middle' appearance='secondary' />
      <RegularButton {...DEFAULT_PROPS} size='middle' appearance='secondary' disabled={true} />
      <RegularButton {...DEFAULT_PROPS} size='middle' appearance='secondary' leftIcon={undefined} />
      <RegularButton {...DEFAULT_PROPS} size='middle' appearance='secondary' leftIcon={undefined} disabled={true} />
      <RegularButton {...DEFAULT_PROPS} size='middle' appearance='secondary' text={undefined} />
      <RegularButton {...DEFAULT_PROPS} size='middle' appearance='secondary' text={undefined} disabled={true} />
    </Row>

    {/*TEXT*/}
    <Row>
      <RegularButton {...DEFAULT_PROPS} variant='text' />
      <RegularButton {...DEFAULT_PROPS} disabled={true} variant='text' />
      <RegularButton {...DEFAULT_PROPS} variant='text' leftIcon={undefined} />
      <RegularButton {...DEFAULT_PROPS} disabled={true} leftIcon={undefined} variant='text' />
      <RegularButton {...DEFAULT_PROPS} variant='text' text={undefined} />
      <RegularButton {...DEFAULT_PROPS} disabled={true} text={undefined} variant='text' />
    </Row>
    <Row>
      <RegularButton {...DEFAULT_PROPS} size='middle' variant='text' />
      <RegularButton {...DEFAULT_PROPS} size='middle' disabled={true} variant='text' />
      <RegularButton {...DEFAULT_PROPS} size='middle' variant='text' leftIcon={undefined} />
      <RegularButton {...DEFAULT_PROPS} size='middle' disabled={true} variant='text' leftIcon={undefined} />
      <RegularButton {...DEFAULT_PROPS} size='middle' variant='text' text={undefined} />
      <RegularButton {...DEFAULT_PROPS} size='middle' disabled={true} text={undefined} variant='text' />
    </Row>
    <Row>
      <RegularButton {...DEFAULT_PROPS} appearance='secondary' variant='text' />
      <RegularButton {...DEFAULT_PROPS} appearance='secondary' disabled={true} variant='text' />
      <RegularButton {...DEFAULT_PROPS} appearance='secondary' variant='text' leftIcon={undefined} />
      <RegularButton {...DEFAULT_PROPS} appearance='secondary' disabled={true} variant='text' leftIcon={undefined} />
      <RegularButton {...DEFAULT_PROPS} appearance='secondary' variant='text' text={undefined} />
      <RegularButton {...DEFAULT_PROPS} appearance='secondary' disabled={true} text={undefined} variant='text' />
    </Row>
    <Row>
      <RegularButton {...DEFAULT_PROPS} appearance='secondary' size='middle' variant='text' />
      <RegularButton {...DEFAULT_PROPS} appearance='secondary' size='middle' disabled={true} variant='text' />
      <RegularButton {...DEFAULT_PROPS} appearance='secondary' size='middle' variant='text' leftIcon={undefined} />
      <RegularButton
        {...DEFAULT_PROPS}
        appearance='secondary'
        size='middle'
        disabled={true}
        variant='text'
        leftIcon={undefined}
      />
      <RegularButton {...DEFAULT_PROPS} appearance='secondary' size='middle' variant='text' text={undefined} />
      <RegularButton
        {...DEFAULT_PROPS}
        appearance='secondary'
        size='middle'
        disabled={true}
        text={undefined}
        variant='text'
      />
    </Row>
    <Row>
      <RegularButton {...DEFAULT_PROPS} appearance='textNegative' variant='text' />
      <RegularButton {...DEFAULT_PROPS} appearance='textNegative' disabled={true} variant='text' />
      <RegularButton {...DEFAULT_PROPS} appearance='textNegative' variant='text' leftIcon={undefined} />
      <RegularButton {...DEFAULT_PROPS} appearance='textNegative' disabled={true} variant='text' leftIcon={undefined} />
      <RegularButton {...DEFAULT_PROPS} appearance='textNegative' variant='text' text={undefined} />
      <RegularButton {...DEFAULT_PROPS} appearance='textNegative' disabled={true} text={undefined} variant='text' />
    </Row>
    <Row>
      <RegularButton {...DEFAULT_PROPS} appearance='textNegative' size='middle' variant='text' />
      <RegularButton {...DEFAULT_PROPS} appearance='textNegative' size='middle' disabled={true} variant='text' />
      <RegularButton {...DEFAULT_PROPS} appearance='textNegative' size='middle' variant='text' leftIcon={undefined} />
      <RegularButton
        {...DEFAULT_PROPS}
        appearance='textNegative'
        size='middle'
        disabled={true}
        variant='text'
        leftIcon={undefined}
      />
      <RegularButton {...DEFAULT_PROPS} appearance='textNegative' size='middle' variant='text' text={undefined} />
      <RegularButton
        {...DEFAULT_PROPS}
        appearance='textNegative'
        size='middle'
        disabled={true}
        variant='text'
        text={undefined}
      />
    </Row>
  </Section>
)
