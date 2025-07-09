import React from 'react'
import css from './ParamsHelpBottomSheet.module.scss'
import { BottomSheet } from '@shared/ui/BottomSheet'
import { RegularButton } from '@shared/ui'
import { ICQuestionMarkBubble } from '@assets/icons'
import { ImageLoader } from '@shared/ui/ImageLoader'
import cn from 'classnames'

export interface ParamsHelpBottomSheetProps {
  hide: VoidFunction
  visibility: boolean
  footer?: {
    text: string
    onClick: VoidFunction
  }
  image?: string
  title: string
  subtitle?: string
  body: string
}

export const ParamsHelpBottomSheet = ({
  visibility,
  subtitle,
  footer,
  title,
  hide,
  body,
  image,
}: ParamsHelpBottomSheetProps) => {
  if (!title) return null

  const getContent = () => (
    <div className={css.content}>
      <div className={css.info}>
        <div className={cn(css.title, { [css.imageless]: !image })}>{title}</div>
        <div className={css.subtitle}>{subtitle}</div>
        <div className={css.body}>{body}</div>
        {footer && (
          <div className={css.footer}>
            <RegularButton
              leftIcon={<ICQuestionMarkBubble />}
              onClick={footer.onClick}
              text={footer.text}
              variant="text"
              size="middle"
            />
          </div>
        )}
      </div>
      {image && (
        <div className={css.image}>
          <ImageLoader src={image} />
        </div>
      )}
    </div>
  )

  return (
    <BottomSheet className={css.paramsHelpBottomSheet} onClose={hide} visibility={visibility} content={getContent()} />
  )
}

ParamsHelpBottomSheet.displayName = 'ParamsHelpBottomSheet'
