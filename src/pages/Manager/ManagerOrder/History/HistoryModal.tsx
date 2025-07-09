import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import css from './HistoryModal.module.scss'
import { HistoryTable } from './HistoryTable'
import { managersOrderStore } from '@/features/manager'
import { BaseModalContainer } from '@/shared/ui'

export const HistoryModal = observer(() => {
  const { handleOpenHistoryModal, orderChangesHistory } = managersOrderStore

  return (
    <BaseModalContainer
      bodyClassName={css.body}
      onClose={() => {
        handleOpenHistoryModal(false)
      }}
    >
      <Flex style={{ padding: '8px 40px' }}>
        <HistoryTable orderChangesHistory={orderChangesHistory} />
      </Flex>
    </BaseModalContainer>
  )
})
