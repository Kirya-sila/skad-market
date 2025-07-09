import React from 'react'
import cn from 'classnames'
import css from './ExpandFilterListModal.module.scss'
import ModalBase from '@shared/ui/Modals/ModalBase/ModalBase'
import { CheckboxListItem, ModalBaseHeader, RegularButton } from '@shared/ui'
import { ICArrowLeftLine } from '@assets/icons'
import { composeActions } from '@shared/libs'
import { plural } from '@shared/libs/utils/string'

export interface ExpandFilterListModalProps<T> {
  title: string
  items: {
    row: T
    checked?: boolean
    disabled?: boolean
  }[]
  className?: string
  totalItems: number
  onClose: VoidFunction
  onShowItems: VoidFunction
  onCheck: (row: T) => VoidFunction
}

const ExpandFilterListModal = <T,>({
  items,
  title,
  onCheck,
  onClose,
  className,
  totalItems,
  onShowItems,
}: ExpandFilterListModalProps<T>) => {
  const getBody = () => (
    <div className={css.listItems}>
      {items?.map(({ row, checked, disabled }) => (
        <CheckboxListItem
          key={String(row)}
          label={String(row)}
          checked={checked}
          disabled={disabled}
          onCheck={onCheck(row)}
        />
      ))}
    </div>
  )

  return (
    <div className={cn(css.expandFilterListModal, className)}>
      <div>
        <ModalBase
          renderHeader={
            <ModalBaseHeader
              topBar={title}
              title={title}
              displayMobileTitle={false}
              onClickAction={onClose}
              className={css.modalHeader}
              renderTopBarLeftSide={<RegularButton leftIcon={<ICArrowLeftLine />} variant="text" onClick={onClose} />}
            />
          }
          renderBody={getBody()}
          onClose={onClose}
          renderFooter={
            <div className={css.footer}>
              <RegularButton
                text={`Показать ${totalItems} ${plural(totalItems, ['товар', 'товара', 'товаров'])}`}
                onClick={composeActions(onClose, onShowItems)}
                fullWidth
                size="middle"
              />
            </div>
          }
          className={css.modal}
        />
      </div>
    </div>
  )
}

export default ExpandFilterListModal

ExpandFilterListModal.displayName = 'ExpandFilterListModal'
