import { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import css from './OrderLayout.module.scss'
import { appRoutes } from '@/app-settings'
import { PhoneIcon } from '@/assets/icons'
import useIsMobile from '@/shared/libs/hooks/useIsMobile'
import { Flex, FlexColumn, FlexRow, SkadMarketLogo } from '@/shared/ui'

interface IOrderContainer {
  children: ReactNode
}

export const OrderLayout: FC<IOrderContainer> = ({ children }) => {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  return (
    <FlexColumn classname={css.orderLayout}>
      <FlexRow classname={css.header}>
        <Flex onClick={() => navigate(appRoutes.root)}>
          <SkadMarketLogo size='large' />
        </Flex>
      </FlexRow>
      <FlexColumn classname={css.content}>
        {children}
        <Flex classname={css.footer}>
          <FlexRow>
            <span>Вопрос-ответ</span>
            <span>Гарантии и возврат</span>
          </FlexRow>
          <Flex>
            {!isMobile ? (
              <>
                <span>Есть вопросы по оформлению заказа? Позвоните нам</span>{' '}
                <FlexRow>
                  <div className={css.phone}>
                    <PhoneIcon />
                  </div>{' '}
                  +7 (800) 250 87 68
                </FlexRow>
              </>
            ) : (
              <FlexColumn classname={css.footerMobileInfo}>
                <FlexRow>
                  <div className={css.phone}>
                    <PhoneIcon />
                  </div>{' '}
                  +7 (800) 250 87 68
                </FlexRow>
                <span>
                  Есть вопросы по оформлению заказа? <br /> Позвоните нам
                </span>
              </FlexColumn>
            )}
          </Flex>
        </Flex>
      </FlexColumn>
    </FlexColumn>
  )
}
