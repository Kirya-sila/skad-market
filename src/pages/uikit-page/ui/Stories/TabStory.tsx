import { useTab } from '@shared/libs'
import { List } from '@shared/ui/List'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'

const tabs = [
  { title: 'Вкладка 1', content: <List letter='C' list={['Carens', 'Carnival', 'Ceed', 'Cerato']} /> },
  { title: 'Вкладка 2', content: <List letter='P' list={['Picanto', 'Picanto X-Line', 'Pride', 'Pro Ceed']} /> },
]

export const TabStory = () => {
  const { ActiveTabContent, Tabs } = useTab(0, tabs)

  return (
    <Section>
      <Title>TAB</Title>
      <Row>
        <Tabs />
      </Row>
      <Row>{ActiveTabContent}</Row>
    </Section>
  )
}
