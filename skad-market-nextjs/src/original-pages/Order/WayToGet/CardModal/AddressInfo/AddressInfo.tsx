import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import css from '../MapModal.module.scss'
import { DeliveryAddressForm } from './AddressForm'
import { InputWithSuggestions } from './InputWithSuggestions'
import { MyLocation } from '@/assets/icons'
import { DeliveryType } from '@/constants'
import { orderStore } from '@/features/order/model/orderStore'
import { getCurrentGeolocation } from '@/helpers'
import { IDeliveryAddress } from '@/interfaces'
import { FlexColumn, FlexRow, RegularButton } from '@/shared/ui'
import { DeliveryInfoBody } from '@/widgets'

export const AddressInfo = observer(() => {
  const {
    currentDeliveryTypeTab,
    resetDeliveryPointInfo,
    deliveryPointInfo,
    setLocation,
    getAddressesSuggestions: getSuggestions,
    addresses,
    searchInputValue,
    setSearchInputValue,
    confirmDeliveryAddress,
    setSuggestion,
    lastValidSearchInputValue,
    isSuggestionsOnLastRequest,
    getLocationCoordinatesByText,
    getDeliveryPointsSuggestions,
    deliveryPointsSuggestions,
    showDeliveryPointInfo,
    setDeliveryLocationLoading,
  } = orderStore
  //TODO: to search delivery point for delivery points tab, and to search address for courier delivery
  const handleInput = (value: string) => {
    if (value) {
      if (currentDeliveryTypeTab === DeliveryType.PVZ) {
        getDeliveryPointsSuggestions(value)
      } else {
        getSuggestions(value)
      }
    }
    setSearchInputValue(value)
  }

  const onClickSuggestion = async (value: string) => {
    if (currentDeliveryTypeTab === DeliveryType.Courier) {
      await getLocationCoordinatesByText(value)
    }
    setSuggestion(value)
  }

  const onClose = () => {
    resetDeliveryPointInfo()
  }

  const handleCurrentPosition = async () => {
    const userPosition = await getCurrentGeolocation()
    setLocation([userPosition[1], userPosition[0]])
  }

  const submitCourierDeliveryAddress = (values: IDeliveryAddress) => {
    confirmDeliveryAddress(values)
  }

  const onBlur = () => {
    if (!isSuggestionsOnLastRequest || !addresses.length) {
      setSearchInputValue(lastValidSearchInputValue)
    }
  }

  const onInputClick = () => {
    if (searchInputValue) {
      getSuggestions(searchInputValue)
    }
  }

  return (
    <FlexColumn classname={css.addressInfo}>
      <span className={css.comment}>
        {currentDeliveryTypeTab === DeliveryType.PVZ
          ? 'Выберите пункт выдачи на карте или воспользуйтесь поиском'
          : 'Укажите адрес на карте или воспользуйтесь поиском'}
      </span>
      <InputWithSuggestions
        placeholder='Введите адрес'
        suggestions={currentDeliveryTypeTab === DeliveryType.PVZ ? deliveryPointsSuggestions : addresses}
        onChange={handleInput}
        onClickSuggestion={onClickSuggestion}
        value={searchInputValue}
        onBlur={onBlur}
        onClick={onInputClick}
      />
      {currentDeliveryTypeTab === DeliveryType.Courier && (
        <DeliveryAddressForm handleSubmit={submitCourierDeliveryAddress} />
      )}
      <FlexRow classname={css.findMyLocation}>
        <RegularButton
          variant='text'
          leftIcon={<MyLocation />}
          text='Определить мое местоположения'
          onClick={handleCurrentPosition}
        />
      </FlexRow>
      {currentDeliveryTypeTab === DeliveryType.Courier && lastValidSearchInputValue && (
        <Button
          size='large'
          type='primary'
          htmlType='submit'
          form='delivery-address-form'
          loading={setDeliveryLocationLoading}
          disabled={setDeliveryLocationLoading}
        >
          Подтвердить адрес доставки
        </Button>
      )}
      {deliveryPointInfo && showDeliveryPointInfo && <DeliveryInfoBody onClose={onClose} />}
    </FlexColumn>
  )
})
