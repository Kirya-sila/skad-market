import { useMemo } from 'react'
import { Button, Checkbox, Flex, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { AntCheckbox } from '../../AntCheckbox'
import { BottomOnMobileModalBase, ModalBaseHeader } from '../ModalBase'
import css from './NotificationsSetup.module.scss'
import { appRoutes } from '@/app-settings'
import { buyerCabinetStore } from '@/features/buyer'
import { useNavigateWithScrollUp, useWindowSize } from '@/shared/libs'

interface INotificationsSetupModal {}

const { Text } = Typography

export const NotificationsSetupModal = observer(() => {
  const navigate = useNavigateWithScrollUp()
  const { width } = useWindowSize()
  const isTablet = useMemo(() => width < 1024, [width])

  const {
    showNotesSetupModal,
    setCheckedNotesOptions,
    checkedNotesOptions,
    saveNotesOptions,
    seveNotesOptionsLoading,
    hasBuyerEmail,
  } = buyerCabinetStore

  const handleClose = () => {
    showNotesSetupModal(false)
  }

  const onCheckboxChange = (checkedValues: string[]) => {
    setCheckedNotesOptions(checkedValues)
  }

  const handleGoToProfile = () => {
    navigate(appRoutes.buyer.profile)
    showNotesSetupModal(false)
  }

  const bodyContent = (
    <Flex vertical gap={18} style={{ paddingBottom: isTablet ? 0 : 16 }}>
      <Text>
        Выберите, как Вы хотите получать информацию о статусах заказов. Должен быть выбран хотя бы один способ
      </Text>
      <Flex vertical gap={8}>
        <Checkbox.Group style={{ width: '100%' }} onChange={onCheckboxChange} value={checkedNotesOptions}>
          <Flex gap={16}>
            <AntCheckbox value='sms'>SMS</AntCheckbox>
            <AntCheckbox value='eMail' disabled={!hasBuyerEmail}>
              E-mail
            </AntCheckbox>
          </Flex>
        </Checkbox.Group>
        {!hasBuyerEmail && (
          <Flex style={{ display: 'inline-block' }}>
            <Text>Чтобы получать информацию о статусах заказов на электронную почту, заполните поле E-mail</Text>{' '}
            <Button type='link' variant='text' onClick={handleGoToProfile} style={{ padding: 0, height: 'auto' }}>
              в разделе Профиль
            </Button>{' '}
            <Text>личного кабинета</Text>
          </Flex>
        )}
      </Flex>
      <Button
        style={{ width: '100%' }}
        type='primary'
        size={isTablet ? 'middle' : 'large'}
        disabled={!checkedNotesOptions.length}
        loading={seveNotesOptionsLoading}
        onClick={saveNotesOptions}
      >
        Сохранить
      </Button>
    </Flex>
  )

  return (
    <BottomOnMobileModalBase
      onClose={handleClose}
      headerContent={
        <ModalBaseHeader
          title='Настройка уведомлений'
          displayAction
          onClickAction={handleClose}
          displayMobileTitle={false}
        />
      }
      bodyContent={bodyContent}
      className={css.notes}
    />
  )
})
