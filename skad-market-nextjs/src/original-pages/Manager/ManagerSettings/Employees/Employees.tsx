import { Flex, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { AddNewEmployee } from './AddNewEmployee'
import { EmployeesTable } from './EmployeesTable'
import { employeesStore } from '@/features/manager'
import { SearchWithPrefix } from '@/shared/ui'

const { Title } = Typography

export const Employees = observer(() => {
  const { getSellerSettingsEmployees } = employeesStore
 

  const handleSearch = (search: string) => {
    getSellerSettingsEmployees(search)
  }

  return (
    <Flex vertical style={{ width: '100%' }}>
      <Flex justify='space-between' style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          Сотрудники
        </Title>
        <AddNewEmployee />
      </Flex>
      <Flex style={{ marginBottom: 16, width: 368 }}>
        <SearchWithPrefix
          placeholder='Поиск сотрудника'
          onSearch={handleSearch}
        />
      </Flex>
      <EmployeesTable />
    </Flex>
  )
})
