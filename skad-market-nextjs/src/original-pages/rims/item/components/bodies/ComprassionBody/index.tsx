import { observer } from 'mobx-react-lite'
import { ComprassionTable } from '../../inputs'
// import { comprassionItems } from './constants'

import css from './ComprassionBody.module.scss'
import { Modals } from '@/app/config/modal/modals-confg'
import { rimsStore } from '@/entities/Rims/model/rimsStore'
import { useModal } from '@/shared/libs'
import { SearchCarModalProps } from '@/shared/ui'

export const ComprassionBody = observer(() => {
  const { compatibleCars } = rimsStore
  const searchCarModal = useModal<SearchCarModalProps>(Modals.SearchCar)

  const displaySearchCarModal = () => {
    searchCarModal.open({
      onClose: searchCarModal.close,
    })
  }
  
  return (
    <div className={css.holder} id='comprassion'>
      <div className={css.title}>
        <div>Совместимость с автомобилем</div>
        <div>{/* Проверить на совместимость с автомобилем */}</div>
      </div>
      <div>{compatibleCars && <ComprassionTable items={compatibleCars} />}</div>
    </div>
  )
})
