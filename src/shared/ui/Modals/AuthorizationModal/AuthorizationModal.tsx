import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { BuyerAuthorizationContent } from '../../BuyerAuthorizationContent'
import { BaseModalContainer } from '../BaseModalContainer'
import css from './AuthorizationModal.module.scss'
import { authorizationStore } from '@/features/authorization'

export const AuthorizationModal = observer(() => {
  const { handleOpenAuthorizationModal, resetModalState, openAuthorizationModal } = authorizationStore

  if (!openAuthorizationModal) {
    return null
  }

  return (
    <BaseModalContainer
      bodyClassName={css.body}
      onClose={() => {
        handleOpenAuthorizationModal(false)
        resetModalState()
      }}
    >
      <Flex vertical className={css.root}>
        <BuyerAuthorizationContent />
      </Flex>
    </BaseModalContainer>
  )
})
