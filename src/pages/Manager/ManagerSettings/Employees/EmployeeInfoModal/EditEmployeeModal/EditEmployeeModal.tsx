import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { EditEmployeeForm } from './EditEmployeeForm'
import { editEmployeeValidationSchema } from './schema'
import { employeesStore } from '@/features/manager'
import { IEmployeesTableData } from '@/interfaces'
import { FormikContainer, ModalLayout } from '@/shared/ui'

interface IEditEmployeeModal {
  onClose: VoidFunction
  values: IEmployeesTableData
}

export const EditEmployeeModal: FC<IEditEmployeeModal> = observer(({ values, onClose }) => {
  const { loading, serverError, resetServerError, updateEmployee } = employeesStore

  const onSubmit = async (values: IEmployeesTableData) => {
    if (serverError) {
      resetServerError()
    }
    await updateEmployee(values)
  }

  return (
    <ModalLayout onClose={onClose} width={456}>
      <FormikContainer initialValues={values} validationSchema={editEmployeeValidationSchema} onSubmit={onSubmit}>
        <EditEmployeeForm onClose={onClose} loading={loading} serverError={serverError} />
      </FormikContainer>
    </ModalLayout>
  )
})
