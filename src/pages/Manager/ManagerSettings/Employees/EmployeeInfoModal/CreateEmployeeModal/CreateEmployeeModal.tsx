import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { createEmployeeInitialValues } from '../../constants'
import { EmployeeInfoForm } from './CreateEmployeeForm'
import { employeeInfoValidationSchema } from './schema'
import { employeesStore } from '@/features/manager'
import { IEmployeesInfo } from '@/interfaces'
import { FormikContainer, ModalLayout } from '@/shared/ui'

interface IEmployeeInfoModal {
  onClose: VoidFunction
}

export const CreateEmployeeModal: FC<IEmployeeInfoModal> = observer(({ onClose }) => {
  const { createEmployee, loading, serverError, resetServerError } = employeesStore

  const onSubmit = async (values: IEmployeesInfo) => {
    if (serverError) {
      resetServerError()
    }
    await createEmployee(values)
  }

  return (
    <ModalLayout onClose={onClose} width={456}>
      <FormikContainer
        initialValues={createEmployeeInitialValues}
        validationSchema={employeeInfoValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <EmployeeInfoForm onClose={onClose} loading={loading} serverError={serverError} />
      </FormikContainer>
    </ModalLayout>
  )
})
