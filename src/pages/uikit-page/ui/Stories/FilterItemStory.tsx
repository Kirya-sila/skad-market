import { ColorFilter } from '@shared/ui/ColorFilter/ColorFilter'
import { FilterItem } from '@/entities/Rims/ui/FilterItem'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { Colors } from '@/shared/types'

export const FilterItemStory = () => (
  <Section>
    <Title>FILTER ITEM</Title>
    {/*PRIMARY*/}
    <Row>
      <div style={{ width: 200 }}>
        <FilterItem
          title='Вылет'
          onHelp={() => alert('help')}
          items={[14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34].map(
            (num, idx) => ({
              row: num,
              checked: !(idx % 2),
            }),
          )}
          onRowClick={(row) => alert(row)}
        />
      </div>
    </Row>
    <Row>
      <FilterItem
        title='Цвет'
        items={[Colors.Silver, Colors.DarkSilver].map((color) => ({ row: color }))}
        renderAction={(rowItem) => <ColorFilter color={rowItem as unknown as Colors} />}
      />
    </Row>
  </Section>
)
