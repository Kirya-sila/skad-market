import { PropsWithChildren, useEffect, useState } from 'react'
import { noop, useWindowSize } from '@shared/libs'
import { Divider, MenuButton, RegularButton, SkadMarketLogo } from '@shared/ui'
import { SocialMediaButton } from '@shared/ui/SocialMediaButton'
import cn from 'classnames'
import { Copyright } from '../Copyright'
import css from './Footer.module.scss'
import { Button } from 'antd'

interface FooterProps {
  className?: string
}

export const Footer = ({ className }: FooterProps) => {
  const { width } = useWindowSize()

  const [showOneRow, setshowOneRow] = useState<boolean>(false)

  useEffect(() => {
    width <= 700 ? setshowOneRow(true) : setshowOneRow(false)
  }, [width])
  const movableColumn = (
    <div className={css.column}>
      <div className={css.columnTitle}>Покупателю</div>
      <MenuButton text='Доставка и оплата' onClick={noop} size='middle' />
      <MenuButton text='Гарантии и возврат' onClick={noop} size='middle' />
      {/* <MenuButton text='Вопрос-ответ' onClick={noop} size='middle' />
      <MenuButton text='Полезно знать' onClick={noop} size='middle' />
      <MenuButton text='Лист ожидания' onClick={noop} size='middle' /> */}
      <MenuButton text='Покупайте как юр.лицо ' onClick={noop} size='middle' />
    </div>
  )

  const movableButton = (
    <Button className={css.logoSubButton} size='middle' onClick={noop}>
      Как стать продавцом?
    </Button>
  )

  const socialButtons = (
    <div className={css.socials}>
      <SocialMediaButton icon='tg' className={css.socialButton} />
      <SocialMediaButton icon='vk' className={css.socialButton} />
      <SocialMediaButton icon='ok' className={css.socialButton} />
      <SocialMediaButton icon='d2' className={css.socialButton} />
    </div>
  )

  const getColumns = (shouldWrap?: boolean) => {
    const Wrapper = ({ children }: PropsWithChildren) =>
      shouldWrap ? <div className={css.columnsRow}>{children}</div> : <>{children}</>

    return (
      <>
        <Wrapper>
          <div className={css.hidableColumn}>{movableColumn}</div>
          <div className={css.catalogColumn}>
            <div className={css.columnTitle}>Каталог</div>
            <MenuButton text='Диски' onClick={noop} size='middle' />
            <MenuButton text='Шины' onClick={noop} size='middle' />
            <MenuButton text='Комплектующие' onClick={noop} size='middle' />
            <MenuButton text='Бренды' onClick={noop} size='middle' />
          </div>
          <div className={css.companyColumn}>
            <div className={css.columnTitle}>Компания</div>
            <MenuButton text='О SkadMarket' onClick={noop} size='middle' />
            <MenuButton text='Контакты' onClick={noop} size='middle' />
            {!showOneRow && movableButton}
          </div>
          <div className={css.columnSocials}>
            <div className={css.topRow}>
              <div className={css.columnTitle}>Связь с нами</div>
              <div className={css.phone}>+7 (800) 250 87 68</div>
              <div className={css.schedule}>пн-пт 09:00-21:00</div>
              {/* <MenuButton text='Заказать звонок' onClick={noop} size='middle' /> */}
            </div>
            {!showOneRow && <div className={css.bottomRow}>{socialButtons}</div>}
          </div>
        </Wrapper>
        {showOneRow && (
          <div className={css.bottomRowWithButton}>
            <div>{movableButton}</div>
            <div>{socialButtons}</div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className={cn(css.footer, className)}>
      <Divider />
      <div className={css.topLine}>
        <div className={css.highColumn}>
          <SkadMarketLogo className={css.logo} />
          {movableColumn}
          {!showOneRow && movableButton}
        </div>
        {getColumns(width >= 700)}
      </div>
      <Divider />
      <div className={css.bottomLine}>
        <div className={css.leftSide}>
          <Copyright />
        </div>
        <div className={css.rightSide}>
          <div className={css.navItem}>Карта сайта</div>
          <div className={css.navItem}>Пользовательское соглашение</div>
          <div className={css.navItem}>Политика обработки персональных даннных</div>
          <div className={css.navItem}>Соглашение на обработку персональных данных</div>
        </div>
      </div>
    </div>
  )
}

Footer.displayName = 'Footer'
