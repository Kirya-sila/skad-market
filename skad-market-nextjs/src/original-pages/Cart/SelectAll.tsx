import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import css from './Cart.module.scss'
import { Modals } from '@/app/config/modal/modals-confg'
import { cartStore } from '@/features/cart'
import { useModal, useWindowState } from '@/shared/libs'
import { CheckboxListItem, FlexRow, IConfirmDeleteModal, RecycleBinButton } from '@/shared/ui'
import confirmModalCss from '@/styles/ConfirmModal.module.scss'

export const SelectAll = observer(() => {
  const { isMobile } = useWindowState()
  const confirmModal = useModal<IConfirmDeleteModal>(Modals.ConfirmDeleteModal)

  const { onAllCheck, allChecked, checkedItems, closeConfirmModal, deleteCheckedItems } = cartStore

  const handleShowHelpModal = () => {
    closeConfirmModal(confirmModal.close)
    confirmModal.open({
      onClose: confirmModal.close,
      onDelete: deleteCheckedItems,
      title: 'Удалить товары из корзины',
      text: 'Вы действительно хотите удалить выбранные товары? Это действие нельзя будет отменить',
      className: cn(confirmModalCss.confirmModal, css.confirmDeleteModal),
    })
  }

  return (
    <FlexRow classname={css.chooseAll}>
      <CheckboxListItem label='Выбрать все' onCheck={onAllCheck} checked={allChecked} inFront={isMobile} />
      {!!checkedItems.length && (
        <FlexRow classname={css.removeChecked} onClick={handleShowHelpModal}>
          <RecycleBinButton />
          <span>Удалить выбранные</span>
        </FlexRow>
      )}
    </FlexRow>
  )
})
