import { Flex, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { BuyersTable } from './BuyersTable'
import { employeesStore } from '@/features/manager'
import { SearchWithPrefix } from '@/shared/ui'

const { Title } = Typography

export const Buyers = observer(() => {
  //TODO: replace with buyersonce API ready
  const { getSellerSettingsEmployees } = employeesStore
 

  const handleSearch = (search: string) => {
    getSellerSettingsEmployees(search)
  }

  return (
    <Flex vertical style={{ width: '100%' }}>
      <Flex justify='space-between' style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          Покупатели
        </Title>
      </Flex>
      <Flex style={{ marginBottom: 16, width: 368 }}>
        <SearchWithPrefix
          placeholder='Поиск покупателя'
          onSearch={handleSearch}
        />
      </Flex>
      <BuyersTable />
    </Flex>
  )
})
