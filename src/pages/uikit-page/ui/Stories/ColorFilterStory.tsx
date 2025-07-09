import { ColorFilter } from '@shared/ui/ColorFilter'
import { Label, Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { Colors } from '@/shared/types'

const DEFAULT_PROPS = {} as const

export const ColorFilterStory = () => (
  <Section>
    <Title>COLOR FILTER</Title>
    <Row>
      <Label>enabled:</Label>
      <ColorFilter {...DEFAULT_PROPS} color={Colors.Black} />
      <ColorFilter {...DEFAULT_PROPS} color={Colors.White} />
      <ColorFilter {...DEFAULT_PROPS} color={Colors.DiamondBlack} />
      <ColorFilter {...DEFAULT_PROPS} color={Colors.Silver} />
      <ColorFilter {...DEFAULT_PROPS} color={Colors.DarkSilver} />
      <Label>disabled:</Label>
      <ColorFilter {...DEFAULT_PROPS} color={Colors.Black} disabled />
      <ColorFilter {...DEFAULT_PROPS} color={Colors.White} disabled />
      <ColorFilter {...DEFAULT_PROPS} color={Colors.DiamondBlack} disabled />
      <ColorFilter {...DEFAULT_PROPS} color={Colors.Silver} disabled />
      <ColorFilter {...DEFAULT_PROPS} color={Colors.DarkSilver} disabled />
    </Row>
    <Row>
      <Label>enabled:</Label>
      <ColorFilter {...DEFAULT_PROPS} color={Colors.White} label='Color name' />
      <ColorFilter {...DEFAULT_PROPS} color={Colors.Black} label='Color name' />
      <ColorFilter {...DEFAULT_PROPS} color={Colors.DiamondBlack} label='Color name' />
      <ColorFilter {...DEFAULT_PROPS} color={Colors.Silver} label='Color name' />
      <ColorFilter {...DEFAULT_PROPS} color={Colors.DarkSilver} label='Color name' />
      <Label>disabled:</Label>
      <ColorFilter {...DEFAULT_PROPS} color={Colors.White} label='Color name' disabled />
      <ColorFilter {...DEFAULT_PROPS} color={Colors.Black} label='Color name' disabled />
      <ColorFilter {...DEFAULT_PROPS} color={Colors.DiamondBlack} label='Color name' disabled />
      <ColorFilter {...DEFAULT_PROPS} color={Colors.Silver} label='Color name' disabled />
      <ColorFilter {...DEFAULT_PROPS} color={Colors.DarkSilver} label='Color name' disabled />
    </Row>
  </Section>
)
