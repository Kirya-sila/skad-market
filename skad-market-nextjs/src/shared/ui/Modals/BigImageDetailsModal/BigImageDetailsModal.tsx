import { FC } from 'react'
import { ModalBaseHeader } from '../ModalBase'
import ModalBase from '../ModalBase/ModalBase'
import { BigImageContent } from './BigImageContent'
import css from './BigImageDetailsModal.module.scss'
import { RimDTOImage } from '@/entities/Rims/model/types'

interface IBigImageDetailsModal {
  onClose: VoidFunction
  images: RimDTOImage[]
  handleSelected: (url: string) => void
  selected: string
  labels: string[]
}

const BigImageDetailsModal: FC<IBigImageDetailsModal> = ({
  onClose,
  images = [],
  handleSelected,
  selected,
  labels,
}) => {
  return (
    <ModalBase
      className={css.baseContent}
      bodyClassName={css.bodyContent}
      renderHeader={
        <ModalBaseHeader
          displayAction
          onClickAction={onClose}
          displayMobileTitle={false}
          className={css.headerContainer}
          topBarStyles={css.topBar}
        />
      }
      renderBody={
        <BigImageContent images={images} handleSelected={handleSelected} selected={selected} labels={labels} />
      }
      onClose={onClose}
    />
  )
}

export default BigImageDetailsModal
