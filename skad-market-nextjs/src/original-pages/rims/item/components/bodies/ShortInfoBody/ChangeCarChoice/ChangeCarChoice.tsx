import { observer } from 'mobx-react-lite'
import css from './ChangeCarChoice.module.scss'
import { Modals } from '@/app/config/modal/modals-confg'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { useModal } from '@/shared/libs'
import { FlexRow, RegularButton, SearchCarModalProps } from '@/shared/ui'

export const ChangeCarChoice = observer(() => {
  const searchCarModal = useModal<SearchCarModalProps>(Modals.SearchCar)

  const displaySearchCarModal = () => {
    searchCarModal.open({
      onClose: searchCarModal.close,
      initialCar: searchCarStore.currentCar,
    })
  }

  return (
    <>
      <FlexRow classname={css.gap}>
        <RegularButton
          size='small'
          appearance='primary'
          variant='text'
          text='Изменить выбор'
          onClick={displaySearchCarModal}
        />
        <RegularButton
          size='small'
          appearance='secondary'
          variant='text'
          text='Отменить выбор'
          onClick={searchCarStore.resetCurrentCar}
        />
      </FlexRow>
    </>
  )
})
