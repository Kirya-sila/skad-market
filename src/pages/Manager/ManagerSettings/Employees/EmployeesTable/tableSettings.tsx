import { Button, TableColumnsType } from 'antd'
import { DotsBurger, EditIcon } from '@/assets/icons'
import { IEmployeesTableData } from '@/interfaces'
import { BurgerComponent, RegularButton } from '@/shared/ui'
import { EmployeesProperties } from '@/constants'
import { employeeBaseColumnSettings } from '../constants'

interface IColumnSettingsProps {
  setValues: (values: IEmployeesTableData) => void
  visibleColumns: EmployeesProperties[]
  handleColumns: (value: EmployeesProperties) => void
}

export const columns = ({
  setValues,
  visibleColumns,
  handleColumns,
}: IColumnSettingsProps): TableColumnsType<IEmployeesTableData> => [
  {
    title: (
      <BurgerComponent
        visibleColumns={visibleColumns}
        handleColumn={handleColumns}
        baseColumnsSettings={employeeBaseColumnSettings}
      />
    ),
    dataIndex: 'dots',
    align: 'center',
    width: 20,
  },
  {
    title: 'ФИО',
    dataIndex: 'fullName',
    onFilter: (value, record) => record.fullName.indexOf(value as string) === 0,
    sorter: (a, b) => a.fullName.length - b.fullName.length,
    // sortDirections: ['descend'],
    showSorterTooltip: { target: 'full-header' },
    hidden: !visibleColumns.includes(EmployeesProperties.fullName),
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.email.length - b.email.length,
    showSorterTooltip: { target: 'full-header' },
    hidden: !visibleColumns.includes(EmployeesProperties.email),
  },
  {
    title: 'Роль в системе',
    dataIndex: 'role',
    sorter: (a, b) => a.role.length - b.role.length,
    showSorterTooltip: { target: 'full-header' },
    hidden: !visibleColumns.includes(EmployeesProperties.role),
  },
  {
    title: '',
    dataIndex: 'edit',
    align: 'end',
    render: (_, record) => {
      return (
        <RegularButton
          style={{ padding: 0, height: 'auto' }}
          size='small'
          leftIcon={<EditIcon />}
          onClick={() => setValues(record)}
        />
      )
    },
  },
]

export const mockData: IEmployeesTableData[] = [
  {
    userId: '2',
    firstName: 'Serg',
    lastName: 'Kir',
    middleName: 'Mih',
    fullName: 'Kir Serg Mih',
    role: 'Admin' as IEmployeesTableData['role'],
    email: 'admin@admin.com',
  },
  {
    userId: '3',
    firstName: 'Ivan',
    lastName: 'Ivanov',
    middleName: 'Ivanovich',
    fullName: 'Ivanov Ivan Ivanovich',
    role: 'Admin' as IEmployeesTableData['role'],
    email: 'admin@admin.com',
  },
  {
    userId: '4',
    firstName: 'Petr',
    lastName: 'Petrov',
    middleName: 'Petrovich',
    fullName: 'Petrov Petr Petrovich',
    role: 'Admin' as IEmployeesTableData['role'],
    email: 'admin2@admin.com',
  },
]
