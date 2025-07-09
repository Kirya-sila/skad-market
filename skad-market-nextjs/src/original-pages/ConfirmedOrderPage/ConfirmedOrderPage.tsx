import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import css from './ConfirmedOrderPage.module.scss'
import { Contacts } from './Contacts'
import { buyerAccessToken } from '@/constants'
import { orderStore } from '@/features/order/model/orderStore'
import { getInfoFromToken } from '@/helpers'
import { MainLayout } from '@/layouts/MainLayout'
import { CatalogButtons, FlexColumn, FlexRow } from '@/shared/ui'
import { Footer } from '@/widgets/Footer'

export const ConfirmedOrderPage = observer(() => {
  const { id } = useParams()
  const { orderStatus, buyerInfo } = orderStore
  const tokenInfo = getInfoFromToken(localStorage.getItem(buyerAccessToken) ?? '')

  return (
    <MainLayout>
      <FlexColumn classname={css.root}>
        <FlexColumn classname={css.mainContent}>
          <span className={css.title}>{orderStatus ? `Заказ №${id} оплачен` : `Заказ №${id} принят в работу`}</span>
          <FlexRow classname={css.contentBody}>
            <FlexColumn classname={css.mainTextContainer}>
              <span className={css.thankYouText}>
                Спасибо за Ваш заказ! Информация о статусе выполнения заказа будет вам приходить в виде SMS - сообщения
                на номер телефона <strong>{tokenInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone']}</strong>
              </span>
              {/* {!orderStatus && (
                <span className={css.paymentReminder}>
                  При получении оплатите товары банковской картой или наличными
                </span>
              )} */}
              <span className={css.boldMainText}>
                Обратите внимание, что для получения товара может понадобиться удостоверение личности
              </span>
              <span className={css.recomendationText}>Возможно, Вы хотели подобрать что-то еще</span>

              <CatalogButtons className={css.catalogButtons} />
            </FlexColumn>

            <Contacts />
          </FlexRow>
        </FlexColumn>
        <Footer />
      </FlexColumn>
    </MainLayout>
  )
})
