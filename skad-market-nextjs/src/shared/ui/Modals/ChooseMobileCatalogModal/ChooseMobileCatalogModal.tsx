import { FC } from 'react'
import cn from 'classnames'
import { ModalBaseHeader } from '../ModalBase'
import ModalBase from '../ModalBase/ModalBase'
import css from './ChooseMobileCatalogModal.module.scss'
import { MainContent } from './MainContent'

interface IChooseMobileCatalogModalProps {
  onClose: VoidFunction
}

const ChooseMobileCatalogModal: FC<IChooseMobileCatalogModalProps> = ({ onClose }) => {
  return (
    <div className={cn(css.chooseMobileCatalogModal)}>
      <ModalBase
        renderHeader={
          <ModalBaseHeader
            className={css.modalHeader}
            // renderTopBarLeftSide={
            //   isShowAll ? (
            //     <RegularButton leftIcon={<ICArrowLeftLine />} variant="text" onClick={handleReset} />
            //   ) : undefined
            // }
            topBar='Каталог'
            title='Каталог'
            displayAction
            onClickAction={onClose}
            displayMobileTitle={false}
          />
        }
        renderBody={<MainContent onClose={onClose} />}
        onClose={onClose}
        // renderFooter={<MainContent />}
      />
    </div>
  )
}

export default ChooseMobileCatalogModal
