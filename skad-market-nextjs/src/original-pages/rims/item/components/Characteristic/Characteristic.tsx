import { FC } from 'react'
import { ILocalType } from '../../interfaces'
import css from './Characteristic.module.scss'
import { localaziCharacteristic } from './localizer'
import { Modals } from '@/app/config/modal/modals-confg'
import { ICQuestionMarkBubble } from '@/assets/icons'
import { ParamsHelpModalProps } from '@/features/filters/ui/ParamsHelpModal/ParamsHelpModal'
import { getModalPropsByFilterName } from '@/features/filters/ui/ParamsHelpModal/lib/getModalPropsByFilterName'
import { noop, useModal } from '@/shared/libs'

type Props = {
  title: keyof ILocalType
  value: string | number | undefined
}

export const Characteristic: FC<Props> = ({ title, value }) => {
  const paramsHelpModal = useModal<ParamsHelpModalProps>(Modals.ParamsHelpModal)
  const modal = getModalPropsByFilterName(title)

  const handleShowHelpModal = () => {
    paramsHelpModal.open({
      onClose: paramsHelpModal.close,
      ...modal!,
      footer: {
        text: 'Все параметры дисков и как их узнать',
        onClick: noop,
      },
    } as ParamsHelpModalProps)
  }

  if (!value) {
    return null
  }

  return (
    <div className={css.holder}>
      <div>
        <div>{localaziCharacteristic(title)}</div>
        {modal && (
          <button onClick={handleShowHelpModal}>
            <ICQuestionMarkBubble />
          </button>
        )}
      </div>
      <div className={css.dots} />
      <div className={css.value}>{value}</div>
    </div>
  )
}
