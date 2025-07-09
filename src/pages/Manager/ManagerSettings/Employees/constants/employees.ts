import { EmployeesProperties } from '@/constants'
import { EmployeeRole, IEmployeesInfo, IEmployeesTableData } from '@/interfaces'
import { ColumnType } from 'antd/es/table'

export const createEmployeeInitialValues: IEmployeesInfo = {
  firstName: '',
  lastName: '',
  middleName: '',
  role: EmployeeRole.Admin,
  email: '',
  password: '',
  passwordConfirmation: '',
}

export const editEmployeeInitialValues: IEmployeesTableData = {
  userId: '',
  fullName: '',
  firstName: '',
  lastName: '',
  middleName: '',
  role: EmployeeRole.Admin,
  email: '',
}

export const roles = [
  { label: 'Администратор', value: EmployeeRole.Admin },
  // { label: 'Покупатель', value: EmployeeRole.Buyer },
  { label: 'Менеджер СКАД', value: EmployeeRole.Seller },
]

export const employeeBaseColumnSettings: Record<EmployeesProperties, ColumnType<IEmployeesTableData>> = {
  [EmployeesProperties.fullName]: {
    title: 'ФИО',
    dataIndex: EmployeesProperties.fullName,
    key: EmployeesProperties.fullName,
  },
  [EmployeesProperties.email]: {
    title: 'E-mail',
    dataIndex: EmployeesProperties.email,
    key: EmployeesProperties.email,
  },
  [EmployeesProperties.role]: {
    title: 'Роль в системе',
    dataIndex: EmployeesProperties.role,
    key: EmployeesProperties.role,
  },
}
