import css from './Contacts.module.scss'
import { useWindowState } from '@/shared/libs'
import { Flex, FlexColumn, RegularButton } from '@/shared/ui'

export const Contacts = () => {
  const { isTablet, isMobile } = useWindowState()
  if (isTablet && !isMobile) {
    return (
      <Flex classname={css.root}>
        <FlexColumn classname={css.section}>
          <span>Как отследить доставку заказа?</span>
          <FlexColumn classname={css.questions}>
            <span>Остались вопросы? Напишите нам</span>
            <RegularButton
              variant='outline'
              appearance='secondary'
              size='small'
              text='Задать вопрос' /* className={css.button}  */
            />
          </FlexColumn>
        </FlexColumn>
        <FlexColumn classname={css.section}>
          <span>Как изменить дату или место заказа?</span>
          <FlexColumn classname={css.callContacts}>
            <span>Или позвоните</span>
            <span>+7 (800) 250 87 68</span>
            <span>пн-пт 09:00-21:00</span>
          </FlexColumn>
        </FlexColumn>
      </Flex>
    )
  }

  return (
    <Flex classname={css.root}>
      <Flex classname={css.howToFollow}>
        <span>Как отследить доставку заказа?</span>
        <span>Как изменить дату или место заказа?</span>
      </Flex>
      <Flex classname={css.contacts}>
        <FlexColumn classname={css.questions}>
          <span>Остались вопросы? Напишите нам</span>
          <RegularButton
            variant='outline'
            appearance='secondary'
            size='small'
            text='Задать вопрос' /* className={css.button}  */
          />
        </FlexColumn>
        <FlexColumn classname={css.callContacts}>
          <span>Или позвоните</span>
          <span>+7 (800) 250 87 68</span>
          <span>пн-пт 09:00-21:00</span>
        </FlexColumn>
      </Flex>
    </Flex>
  )
}
