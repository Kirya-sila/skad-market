import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { EditEmployeeModal } from '../EmployeeInfoModal/EditEmployeeModal/EditEmployeeModal'
import { editEmployeeInitialValues } from '../constants'
import { columns } from './tableSettings'
import { EmployeesProperties } from '@/constants'
import { employeesStore } from '@/features/manager'
import { IEmployeesTableData } from '@/interfaces'
import { useVisibleColumns } from '@/shared/libs'
import { Table } from '@/shared/ui'

export const EmployeesTable = observer(() => {
  const {
    employees,
    getSellerSettingsEmployees,
    employeesLoading,
    handleUpdateEmployeeModal: handleModal,
    isUpdateEmployeeModalOpen: isModalOpen,
  } = employeesStore
  const [editValues, setEditValues] = useState<IEmployeesTableData>(editEmployeeInitialValues)

  const [visibleColumns, handleColumns] = useVisibleColumns<EmployeesProperties>(EmployeesProperties)

  useEffect(() => {
    getSellerSettingsEmployees()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setValues = (values: IEmployeesTableData) => {
    setEditValues(values)
    handleModal()
  }

  return (
    <>
      <Table<IEmployeesTableData>
        columns={columns({ setValues, visibleColumns, handleColumns })}
        dataSource={employees}
        rowKey='userId'
        pagination={{ size: 'small' }}
        loading={employeesLoading}
      />
      {isModalOpen && <EditEmployeeModal values={editValues} onClose={handleModal} />}
    </>
  )
})
