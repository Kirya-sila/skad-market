import { makeAutoObservable } from 'mobx'
import { createEmployee, getEmployees, updateEmployee } from '../api'
import { IEmployeesInfo, IEmployeesTableData } from '@/interfaces'
import { handleCatchedError } from '@/shared/libs'

class EmployeesStore {
  employees: IEmployeesTableData[] | undefined = []
  employeesLoading = false
  loading = false
  serverError = ''
  isCreateEmployeeModalOpen = false
  isUpdateEmployeeModalOpen = false

  constructor() {
    makeAutoObservable(this)
  }

  getSellerSettingsEmployees = async (search = '') => {
    this.employeesLoading = true
    try {
      const data = await getEmployees(search)
      this.setSettingsEmployees(data)
    } catch (e) {
      handleCatchedError(e)
    } finally {
      this.employeesLoading = false
    }
  }

  setSettingsEmployees = (data: IEmployeesTableData[] | undefined) => {
    this.employees = data
  }

  createEmployee = async (values: IEmployeesInfo) => {
    this.loading = true
    try {
      await createEmployee(values)
      this.getSellerSettingsEmployees()
      this.isCreateEmployeeModalOpen = false
    } catch (e) {
      this.serverError = handleCatchedError(e)
    } finally {
      this.loading = false
    }
  }

  updateEmployee = async (values: IEmployeesTableData) => {
    this.loading = true
    try {
      await updateEmployee(values)
      this.getSellerSettingsEmployees()
      this.isUpdateEmployeeModalOpen = false
    } catch (e) {
      this.serverError = handleCatchedError(e)
    } finally {
      this.loading = false
    }
  }

  handleLoading = (isLoading: boolean) => {
    this.loading = isLoading
  }

  resetServerError = () => {
    this.serverError = ''
  }

  handleCreateEmployeeModal = () => {
    this.resetServerError()
    this.isCreateEmployeeModalOpen = !this.isCreateEmployeeModalOpen
  }

  handleUpdateEmployeeModal = () => {
    this.resetServerError()
    this.isUpdateEmployeeModalOpen = !this.isUpdateEmployeeModalOpen
  }
}

export const employeesStore = new EmployeesStore()
