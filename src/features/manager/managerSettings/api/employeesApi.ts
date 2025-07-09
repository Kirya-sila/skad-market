import { apiRoutes } from '@/app-settings'
import { getUrlWithSearchParams } from '@/helpers'
import { IEmployeesInfo, IEmployeesTableData } from '@/interfaces'
import { httpClient } from '@/shared/api/httpClient'

interface IUserCreateResponse {
  succeeded: boolean
  errorMessage: string
}

export const getEmployees = async (search = ''): Promise<IEmployeesTableData[] | undefined> => {
  return await httpClient(getUrlWithSearchParams(apiRoutes.settingsEmployees, { input: search }), {}, 'seller')
}

export const createEmployee = async (values: IEmployeesInfo): Promise<IUserCreateResponse> => {
  return await httpClient(apiRoutes.createEmployee, { method: 'POST', body: values }, 'seller')
}

export const updateEmployee = async (values: IEmployeesTableData): Promise<IUserCreateResponse> => {
  return await httpClient(apiRoutes.updateEmployee, { method: 'POST', body: values }, 'seller')
}
