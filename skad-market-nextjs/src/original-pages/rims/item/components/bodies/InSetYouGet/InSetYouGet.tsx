import { FC } from 'react'
import Lense from '@assets/images/lense.png'
import Vstavka from '@assets/images/vstavka.png'
import css from './InSetYouGet.module.scss'
import { RimDTO } from '@/entities/Rims/model/types'
import { ImageLoader } from '@/shared/ui/ImageLoader'

interface IInSetYouGet {
  cap?: RimDTO['cap']
  label?: RimDTO['label']
}

export const InSetYouGet: FC<IInSetYouGet> = ({ cap, label }) => {
  const prepareString = (item: string) => {
    return item
      .split('<br>')
      .map((each) => each.trim())
      .join(' ')
  }

  if (!cap && !label) {
    return null
  }

  return (
    <div className={css.wrapper}>
      <div className={css.title}>В комплекте поставляется:</div>
      <div className={css.setContainer}>
        {!!cap && (
          <div className={css.set}>
            <div>
              <ImageLoader src={Vstavka} />
            </div>
            <div>{prepareString(cap)}</div>
          </div>
        )}
        {!!label && (
          <div className={css.set}>
            <div>
              <ImageLoader src={Lense} />
            </div>
            <div>{prepareString(label)}</div>
          </div>
        )}
      </div>
    </div>
  )
}
