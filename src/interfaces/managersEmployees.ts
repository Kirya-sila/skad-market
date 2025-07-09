export enum EmployeeRole {
  Admin = 'Admin',
  Buyer = 'Buyer',
  Seller = 'Seller',
}

export interface IBaseEmployeeInfo {
  firstName: string
  lastName: string
  middleName: string
  role: EmployeeRole
  email: string
}

export interface IEmployeesInfo extends IBaseEmployeeInfo {
  password: string
  passwordConfirmation: string
}

export interface IEmployeesTableData extends IBaseEmployeeInfo {
  userId: React.Key
  fullName: string
}

export interface IBuyersTableData {
  id: React.Key
  fullName: string
  phoneNumber: string
  email: string
}
