import { FC } from 'react'
import cn from 'classnames'
import css from './ConfirmDeleteModal.module.scss'
import { FlexRow, ModalBaseHeader, RegularButton } from '@/shared/ui'
import ModalBase from '@/shared/ui/Modals/ModalBase/ModalBase'

export interface IConfirmDeleteModal {
  title?: string
  topBar?: string
  onClose: VoidFunction
  onDelete: VoidFunction
  text?: string
  className?: string
}

const ConfirmDeleteModal: FC<IConfirmDeleteModal> = ({ title, topBar, onClose, text, onDelete, className }) => {
  return (
    <ModalBase
      renderHeader={
        <ModalBaseHeader
          topBar={topBar}
          title={title}
          displayAction
          onClickAction={onClose}
          displayMobileTitle={false}
        />
      }
      renderBody={<span className={css.text}>{text}</span>}
      onClose={onClose}
      renderFooter={
        <FlexRow>
          <RegularButton appearance='secondary' text='Отменить' onClick={onClose} fullWidth size='middle' />
          <RegularButton appearance='primaryNegative' text='Удалить' onClick={onDelete} fullWidth size='middle' />
        </FlexRow>
      }
      className={cn(className, css.root)}
    />
  )
}

export default ConfirmDeleteModal
