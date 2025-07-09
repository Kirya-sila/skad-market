import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { DotsWithTooltip } from '../../../DotsWithTooltip'
import css from './Dots.module.scss'
import { RecycleBinIcon, ShowOnMapArrow } from '@/assets/icons'
import { orderStore } from '@/features/order/model/orderStore'
import { FlexColumn, FlexRow } from '@/shared/ui'

interface IDots {
  id: string
  isLast: boolean
}

export const Dots: FC<IDots> = observer(({ id, isLast }) => {
  const { checkedDeliveryOptionId, deleteDeliveryItem, lookOnMap: lookOnCard } = orderStore

  const lookDeliveryItemOnCard = () => {
    lookOnCard(id)
  }

  const tooltipContent = (
    <FlexColumn classname={css.root}>
      <FlexRow>
        <div style={{ height: '20px' }}>
          <ShowOnMapArrow />
        </div>
        <span className={css.tooltipText} onClick={lookDeliveryItemOnCard}>
          Смотреть на карте
        </span>
      </FlexRow>
      {!(id === checkedDeliveryOptionId) && !isLast && (
        <FlexRow classname={css.delete}>
          <div style={{ height: '20px' }}>
            <RecycleBinIcon />
          </div>
          <span className={css.tooltipText} onClick={() => deleteDeliveryItem(id)}>
            Удалить
          </span>
        </FlexRow>
      )}
    </FlexColumn>
  )

  return <DotsWithTooltip tooltipContent={tooltipContent} name={`delivery-item-tooltip-${id}`} />
})
