import { Divider, Flex, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { ManagerPageWrapper } from '../ManagerPageWrapper'
import { ManagerGoodsTable } from './ManagerGoodsTable'
import { GoodsStatus } from '@/constants'
import { goodsStore } from '@/features/manager/goods'
import { RegularButton, SearchWithPrefix, SectionTitle } from '@/shared/ui'
import { primaryBlack, primaryDarkGray } from '@/theme'

const availabilityFilterSettings = [
  { title: 'Все', value: '' },
  { title: 'В продаже', value: GoodsStatus.available },
  { title: 'Нет в наличии', value: GoodsStatus.notAvailable },
  { title: 'Снят с производства', value: GoodsStatus.discontinued },
]

export const ManagerGoods = observer(() => {
  const { availabilityFilter, handleAvavilability } = goodsStore
  const handleSearch = (search: string) => {
    console.log('search value: ', search)
  }

  return (
    <ManagerPageWrapper title='Товары'>
      <Flex vertical>
        <Flex justify='space-between' style={{ marginBottom: 24 }}>
          <Flex justify='flex-start' align='center' gap={24}>
            {availabilityFilterSettings.map(({ title, value }, i) => (
              <Flex key={title} align='center' style={{ height: '100%' }}>
                {i === availabilityFilterSettings.length - 1 && (
                  <Divider type='vertical' style={{ height: '100%', marginRight: 24, marginLeft: 0 }} />
                )}
                <RegularButton
                  variant='text'
                  text={
                    <SectionTitle
                      style={{ fontSize: 18, color: availabilityFilter === value ? primaryBlack : primaryDarkGray }}
                    >
                      {title}
                    </SectionTitle>
                  }
                  appearance='defaultText'
                  onClick={() => handleAvavilability(value)}
                />
              </Flex>
            ))}
          </Flex>

          <Flex style={{ width: 368 }} justify='flex-end'>
            <SearchWithPrefix placeholder='Поиск по названию и артикулу' onSearch={handleSearch} />
          </Flex>
          {/* <SellStatusFilter /> */}
        </Flex>

        <ManagerGoodsTable />
      </Flex>
    </ManagerPageWrapper>
  )
})
