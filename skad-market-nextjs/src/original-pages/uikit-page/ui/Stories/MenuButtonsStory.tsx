import { LocationIcon } from '@assets/icons/LocationIcon'
import { MenuButton } from '@shared/ui/MenuButton'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'

const DEFAULT_PROPS = {
  size: 'large',
  leftIcon: <LocationIcon />,
  text: 'MenuButton',
  onClick: () => alert('click regular button'),
} as const

export const MenuButtonsStory = () => (
  <Section>
    <Title>MENU BUTTONS</Title>
    {/*PRIMARY*/}
    <Row>
      <MenuButton {...DEFAULT_PROPS} />
      <MenuButton {...DEFAULT_PROPS} disabled />

      <MenuButton {...DEFAULT_PROPS} leftIcon={undefined} />
      <MenuButton {...DEFAULT_PROPS} leftIcon={undefined} disabled />

      <MenuButton {...DEFAULT_PROPS} text={undefined} />
      <MenuButton {...DEFAULT_PROPS} disabled text={undefined} />
    </Row>
    <Row>
      <MenuButton {...DEFAULT_PROPS} size='middle' />
      <MenuButton {...DEFAULT_PROPS} disabled size='middle' />

      <MenuButton {...DEFAULT_PROPS} leftIcon={undefined} size='middle' />
      <MenuButton {...DEFAULT_PROPS} leftIcon={undefined} disabled size='middle' />

      <MenuButton {...DEFAULT_PROPS} size='middle' text={undefined} />
      <MenuButton {...DEFAULT_PROPS} disabled size='middle' text={undefined} />
    </Row>
  </Section>
)
