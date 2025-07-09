import { ReactNode, useCallback } from 'react'
import { SliderTwistedRectangles } from '@assets/shapes'
import { RegularButton } from '@shared/ui/RegularButton'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import css from './Frame.module.scss'
import { appRoutes } from '@/app-settings'
import { useWindowSize } from '@/shared/libs'

export interface FirstFrameProps {
  className?: string
  descriptionStyles?: string
  description: ReactNode
  image1: string
  image2: string
  onClick: VoidFunction
}

export const Frame = ({ className, description, descriptionStyles, image1, image2, onClick }: FirstFrameProps) => {
  const navigate = useNavigate()
  const { width } = useWindowSize()

  const onBannerClick = useCallback(() => {
    if (width < 1024) {
      onClick()
      navigate(appRoutes.rims)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  return (
    <div className={cn(css.frame, className || css.frameBackground)}>
      <SliderTwistedRectangles />
      <div className={css.cards}>
        <img src={image1} onClick={onBannerClick} />
        <img src={image2} onClick={onBannerClick} />
      </div>
      <div className={css.body}>
        <div className={cn(css.description, descriptionStyles)}>{description}</div>
        <RegularButton
          text='Каталог'
          size='middle'
          onClick={() => {
            onClick()
            navigate(appRoutes.rims)
          }}
        />
      </div>
    </div>
  )
}
