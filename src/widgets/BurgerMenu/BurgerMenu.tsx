import React from 'react'
import cn from 'classnames'
import css from './BurgerMenu.module.scss'
import { MenuButton, SkadMarketLogo } from '@shared/ui'
import { IconButton } from '@shared/ui/IconButton'
import { CloseIcon, LocationIcon, PhoneIcon } from '@assets/icons'
import {
  composeActions,
  DEFAULT_CURRENT_CITY,
  formatPhoneNumber,
  noop,
  SKADMARKET_HOTLINE,
  useToggle,
  WORK_SCHEDULE_FORMATTED,
} from '@shared/libs'
import { ImageLoader } from '@shared/ui/ImageLoader'
import promoBannerImage from '@assets/images/promo_banner_image_1.png'

interface BurgerMenuProps {
  className?: string
  isShow: boolean
  onHide: VoidFunction
  onChangeCity?: VoidFunction
  currentCity?: string
  onOrderCallBack?: VoidFunction
}

export const BurgerMenu = ({
  className,
  isShow,
  onHide,
  currentCity = DEFAULT_CURRENT_CITY,
  onChangeCity = noop,
  onOrderCallBack = noop,
}: BurgerMenuProps) => {
  const [isHelpMenuVisible, toggleHelpMenuVisible, , , hideHelpMenu] = useToggle(false)

  const handleHide = () => {
    hideHelpMenu()
    onHide()
  }

  return (
    <div className={cn(css.burgerMenu, className, { [css.show]: isShow })}>
      <div className={css.header}>
        <SkadMarketLogo className={css.logo} />
        <IconButton icon={<CloseIcon />} onClick={handleHide} className={css.closeIcon} />
      </div>
      <div className={css.content}>
        <div className={css.body}>
          <MenuButton onClick={noop} text="О SkadMarket" />
          <MenuButton onClick={noop} text="Доставка и оплата" />
          <MenuButton onClick={toggleHelpMenuVisible} text="Помощь" />
          <div className={cn(css.helpMenu, { [css.helpMenuVisible]: isHelpMenuVisible })}>
            <MenuButton onClick={noop} text="Покупателям" size="middle" />
            <MenuButton onClick={noop} text="Продавцам" size="middle" />
            <MenuButton onClick={noop} text="Доставка и оплата" size="middle" />
            <MenuButton onClick={noop} text="Гарантии и возврат" size="middle" />
            <MenuButton onClick={noop} text="Полезно знать" size="middle" />
            <MenuButton onClick={noop} text="Вопрос-ответ" size="middle" />
          </div>
          <MenuButton onClick={noop} text="Сравнения" />
          <MenuButton onClick={noop} text="Лист ожидания" />
          <MenuButton onClick={noop} text="Покупайте как юр.лицо" />

          {/* <div className={css.banner}>
            <ImageLoader src={promoBannerImage} />
            <div className={css.text}>
              <div className={css.supTitle}>Акция действует с 20.11 по 30.11</div>
              <div className={css.title}>Черная пятница скидки до 75%</div>
            </div>
          </div> */}
          <MenuButton onClick={composeActions(handleHide, onOrderCallBack)} text="Заказать звонок" />
          <MenuButton onClick={noop} text="Написать в поддержку" />
          <MenuButton onClick={noop} text="Контакты" />
        </div>
        <div className={css.footer}>
          <div className={css.column}>
            <a href={`tel:${SKADMARKET_HOTLINE}`}>
              <MenuButton
                leftIcon={<PhoneIcon />}
                text={formatPhoneNumber(SKADMARKET_HOTLINE)}
                onClick={noop}
                size="large"
              />
            </a>
            <div className={css.colSubtitle}>{WORK_SCHEDULE_FORMATTED}</div>
          </div>

          <div className={css.column}>
            <MenuButton
              leftIcon={<LocationIcon />}
              text={currentCity}
              onClick={composeActions(handleHide, onChangeCity)}
              size="large"
            />
            <div className={css.colSubtitle}>Ваш город</div>
          </div>
        </div>
      </div>
    </div>
  )
}

BurgerMenu.displayName = 'BurgerMenu'
