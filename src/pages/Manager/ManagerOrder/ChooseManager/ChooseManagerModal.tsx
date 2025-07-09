import { useEffect, useState } from 'react'
import { Button, Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import css from './ChooseManager.module.scss'
import { managersOrderStore } from '@/features/manager'
import { BaseModalContainer, CardTitle, InfoText, SelectionInput } from '@/shared/ui'
import { useParams } from 'react-router-dom'

// interface IChooseManagerModal {}

export const ChooseManagerModal = observer(() => {
  const { orderId = '' } = useParams()
  const {
    managersListOptions,
    getManagersList,
    handleOpenChooseManagerModal,
    assignManager,
    assignedManager,
    loading,
    assignManagerLoading,
  } = managersOrderStore
  const [chosenManager, setChoosenManager] = useState(assignedManager)

  const handleAssignManager = () => {
    assignManager(orderId, chosenManager)
  }

  useEffect(() => {
    if (!managersListOptions.length) {
      getManagersList()
    }
  }, [managersListOptions])

  return (
    <BaseModalContainer
      bodyClassName={css.body}
      onClose={() => {
        handleOpenChooseManagerModal(false)
        setChoosenManager('')
        // handleOpenCancelOrderModal(false)
      }}
    >
      <Flex vertical gap={24} style={{ padding: '0 40px 40px' }}>
        <CardTitle>Выбор менеджера</CardTitle>
        <InfoText style={{ fontSize: 16 }}>Из выпадающего списка выберите исполнителя по данному заказу</InfoText>
        <SelectionInput
          items={managersListOptions}
          placeholder='Менеджер'
          inputValuePlaceholder='Выберите менеджера'
          onChange={setChoosenManager}
          value={chosenManager}
          loading={loading}
        />
        <Button type='primary' size='large' onClick={handleAssignManager} loading={assignManagerLoading}>
          Применить
        </Button>
      </Flex>
    </BaseModalContainer>
  )
})
