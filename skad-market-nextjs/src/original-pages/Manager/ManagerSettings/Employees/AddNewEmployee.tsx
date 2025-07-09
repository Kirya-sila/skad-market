import { observer } from 'mobx-react-lite'
import { CreateEmployeeModal } from './EmployeeInfoModal'
import { ICPlus } from '@/assets/icons'
import { employeesStore } from '@/features/manager'
import { RegularButton } from '@/shared/ui'

export const AddNewEmployee = observer(() => {
  const { handleCreateEmployeeModal: handleOpen, isCreateEmployeeModalOpen: isOpen } = employeesStore

  return (
    <>
      <RegularButton
        text='Новый сотрудник'
        leftIcon={<ICPlus color='#ffffff' opacity={1} />}
        size='middle'
        onClick={handleOpen}
      />
      {isOpen && <CreateEmployeeModal onClose={handleOpen} />}
    </>
  )
})
