import { useEffect, useRef, useState } from 'react'
import { Modals } from '@app/config/modal/modals-confg'
import { BurgerIcon, OrdersIcon, PhoneIcon, UserIcon } from '@assets/icons'
import { DEFAULT_CURRENT_CITY, noop, useModal, useScrollHideShow, useToggle } from '@shared/libs'
import { useCityLocation, useNavigateWithScrollUp, useWindowSize } from '@shared/libs/hooks'
import { useInput } from '@shared/libs/hooks/useInput'
import { OrderCallBackModalProps, RegularButton, SearchCarModalProps } from '@shared/ui'
import { MenuButton } from '@shared/ui/MenuButton'
import { SkadMarketLogo } from '@shared/ui/SkadMarketLogo'
import { CallButtonTooltip, HelpButtonTooltip, UserButtonTooltip } from '@shared/ui/Tooltip'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { CityLocation } from '../CityLocation'
import css from './Header.module.scss'
import { HeaderCartButtonContainer } from './HeaderCartButtonContainer'
import { appRoutes } from '@/app-settings'
import { buyerAccessToken, buyerRefreshToken } from '@/constants'
import { cityStore } from '@/features/location/model'
import { BurgerMenu, SearchWidget } from '@/widgets'
import { ConfirmCityBottomSheet } from '@/widgets/ConfirmCityBottomSheet'

export interface HeaderProps {
  className?: string
}

export const Header = observer(({ className }: HeaderProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([])

  const navigate = useNavigateWithScrollUp()
  const windowSize = useWindowSize()
  const cityLocationProps = useCityLocation()

  const [isShowBurgerMenu, , , showBurgerMenu, hideBurgerMenu] = useToggle(false)
  const [isSearching, toggleSearching, setSearching] = useToggle(false)
  const [productSearchText, , onChangeProductSearchText] = useInput()

  const isAuthorized = localStorage.getItem(buyerRefreshToken) && localStorage.getItem(buyerAccessToken)

  const logoVariant = windowSize.width > 768 ? 'combined' : 'symbolic'

  const searchRef = useRef<HTMLInputElement>(null)

  const bottomLineButtonSize = windowSize.width > 768 ? 'large' : 'middle'

  useEffect(() => {
    if (productSearchText?.length > 0) {
      setSuggestions([
        'Литые диски Арнар (КС904) 7.000xR16 5x114.3 DIA67.1 ET45',
        'Шины Арнар (КС1039) 7.500xR19 5x112 DIA66.6 ET34',
        'Литые диски Арнар (КС445) 6.000xR14 4x113.3 DIA44 ET40',
      ])
      setSearching(true)
    } else {
      setSuggestions([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSearchText])

  const handleResetSearch = () => {
    if (searchRef?.current?.value) {
      searchRef.current.value = ''
    }
    setSuggestions([])
    setSearching(false)
    onChangeProductSearchText('')
  }

  const handleFocus = () => {
    setSearching(true)
  }

  const handleBlur = () => {
    // setSearching(false)
  }

  const headerStyle = useScrollHideShow()

  const searchCarModal = useModal<SearchCarModalProps>(Modals.SearchCar)
  const orderCallBackModal = useModal<OrderCallBackModalProps>(Modals.OrderCallback)

  const displaySearchCarModal = () => {
    searchCarModal.open({
      onClose: searchCarModal.close,
    })
  }

  const displayOrderCallBackModal = () => {
    orderCallBackModal.open({
      onClose: orderCallBackModal.close,
    })
  }

  return (
    <>
      <header style={headerStyle} className={cn(css.header, className, { [css.searching]: isSearching })}>
        <div className={css.topLine}>
          <SkadMarketLogo variant={logoVariant} className={css.logo} onClick={() => navigate(appRoutes.root)} />
          <CityLocation className={cn(css.loc, css.topLoc)} type='top' {...cityLocationProps} />
          <SearchWidget />
          {/* {isSearching && <div className={css.searchUnderlay} onClick={toggleSearching} />} */}
          {/* <SearchInput
            ref={searchRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(css.search, { [css.searching]: isSearching })}
            value={productSearchText}
            suggestions={suggestions}
            onChange={onChangeProductSearchText}
          /> */}
          {/* <div className={css.search} /> */}
          <MenuButton onClick={noop} size='middle' className={css.userIcon} leftIcon={<UserIcon />} />
          <MenuButton onClick={showBurgerMenu} size='middle' className={css.burgerIcon} leftIcon={<BurgerIcon />} />
          <MenuButton onClick={noop} size='middle' className={css.about} text='О SkadMarket' />
          <MenuButton onClick={noop} size='middle' className={css.pay} text='Доставка и оплата' />
          <HelpButtonTooltip>
            <MenuButton onClick={noop} size='middle' className={css.help} text='Помощь' />
          </HelpButtonTooltip>
          <CallButtonTooltip onOrderCallBack={displayOrderCallBackModal}>
            <MenuButton onClick={noop} size='middle' className={css.call} leftIcon={<PhoneIcon />} />
          </CallButtonTooltip>
          <RegularButton onClick={handleResetSearch} size='large' className={css.cancel} text='Отмена' variant='text' />
        </div>
        <div className={css.bottomLine}>
          <MenuButton
            onClick={() => navigate(appRoutes.rims)}
            size={bottomLineButtonSize}
            className={css.rims}
            text='Диски'
          />
          <MenuButton
            onClick={() => navigate(appRoutes.tyres)}
            size={bottomLineButtonSize}
            className={css.tires}
            text='Шины'
          />
          <MenuButton
            onClick={() => navigate(appRoutes.components)}
            size={bottomLineButtonSize}
            className={css.accry}
            text='Комплектующие'
          />
          <MenuButton
            onClick={displaySearchCarModal}
            size={bottomLineButtonSize}
            className={css.sel}
            text='Подбор по автомобилю'
          />
          {/* <MenuButton onClick={noop} size={bottomLineButtonSize} className={css.promo} text='Акции' /> */}
          {isAuthorized ? (
            <>
              <UserButtonTooltip className={css.usr}>
                <MenuButton
                  onClick={noop}
                  size={bottomLineButtonSize}
                  className={css.usr}
                  text='Личный кабинет'
                  leftIcon={<UserIcon />}
                />
              </UserButtonTooltip>
            </>
          ) : (
            <MenuButton
              onClick={() => navigate(appRoutes.buyerSignIn)}
              size={bottomLineButtonSize}
              className={css.usr}
              text='Войти'
              leftIcon={<UserIcon />}
            />
          )}
          {isAuthorized && (
            <>
              <MenuButton
                onClick={() => navigate(appRoutes.buyer.orders.root)}
                size={bottomLineButtonSize}
                className={css.orders}
                text='Заказы'
                leftIcon={<OrdersIcon />}
              />
              {/* <MenuButton
                onClick={() => navigate(appRoutes.buyer.favorites)}
                size={bottomLineButtonSize}
                className={css.fav}
                text='Избранное'
                leftIcon={<CountedFavoriteButton count={favoritesStore.count} />}
              /> */}
            </>
          )}
          <HeaderCartButtonContainer className={css.cart} bottomLineButtonSize={bottomLineButtonSize} />
          <CityLocation className={cn(css.loc, css.bottomLoc)} type='bottom' {...cityLocationProps} />
        </div>
      </header>
      <ConfirmCityBottomSheet {...cityLocationProps} />
      <BurgerMenu
        isShow={isShowBurgerMenu}
        onHide={hideBurgerMenu}
        onChangeCity={cityLocationProps.displayChooseCityModal}
        onOrderCallBack={displayOrderCallBackModal}
        currentCity={cityStore.currentCity || DEFAULT_CURRENT_CITY}
      />
    </>
  )
})

Header.displayName = 'Header'
