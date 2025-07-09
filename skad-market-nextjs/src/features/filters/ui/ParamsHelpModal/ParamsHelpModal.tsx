import React from 'react'
import cn from 'classnames'
import css from './ParamsHelpModal.module.scss'
import ModalBase from '@shared/ui/Modals/ModalBase/ModalBase'
import { RegularButton } from '@shared/ui'
import { ImageLoader } from '@shared/ui/ImageLoader'
import { ICCloseLine, ICQuestionMarkBubble } from '@assets/icons'

export interface ParamsHelpModalProps {
  className?: string
  onClose: VoidFunction
  image?: string
  title: string
  subtitle?: string
  body: string
  footer?: {
    text: string
    onClick: VoidFunction
  }
}

const ParamsHelpModal = ({ className, onClose, title, subtitle, body, footer, image }: ParamsHelpModalProps) => {
  const getBody = () => (
    <div className={css.modalBody}>
      <div className={css.info}>
        <div className={css.title}>{title}</div>
        <div className={css.subtitle}>{subtitle}</div>
        <div className={css.body}>{body}</div>
        {footer && (
          <div className={css.footer}>
            <RegularButton
              leftIcon={<ICQuestionMarkBubble />}
              onClick={footer.onClick}
              text={footer.text}
              variant='text'
              size='middle'
            />
          </div>
        )}
      </div>
      {image && (
        <div className={css.image}>
          <ImageLoader src={image} />
        </div>
      )}
      <div className={css.close} onClick={onClose}>
        <ICCloseLine />
      </div>
    </div>
  )

  return (
    <div className={cn(className)}>
      <ModalBase className={css.paramsHelpModal} renderBody={getBody()} onClose={onClose} />
    </div>
  )
}

export default ParamsHelpModal

ParamsHelpModal.displayName = 'ParamsHelpModal'
