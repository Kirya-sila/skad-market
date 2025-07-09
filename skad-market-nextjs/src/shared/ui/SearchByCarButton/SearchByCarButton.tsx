import carImage from '@assets/images/catalog_filters_car.png'
import { RegularButton } from '@shared/ui'
import { ImageLoader } from '@shared/ui/ImageLoader'
import cn from 'classnames'
import css from './SearchByCarButton.module.scss'
import { withStopPropagation } from '@/shared/libs'

interface SearchByCarButtonProps {
  className?: string
  selected?: boolean
  onCancel?: VoidFunction
  onChange?: VoidFunction
  onClick?: VoidFunction
}

export const SearchByCarButton = ({ className, selected, onCancel, onChange, onClick }: SearchByCarButtonProps) => {
  return (
    <div className={cn(css.searchByCarButton, className, { [css.selected]: selected })} onClick={onClick}>
      <div className={css.image}>
        <ImageLoader src={carImage} />
      </div>
      {selected ? (
        <div className={css.buttons}>
          <RegularButton appearance='primary' variant='text' text='Изменить выбор' onClick={onChange} />
          <RegularButton appearance='textNegative' variant='text' text='Отменить' onClick={withStopPropagation(onCancel)} />
        </div>
      ) : (
        <div className={css.label}>Подбор по автомобилю</div>
      )}
    </div>
  )
}

SearchByCarButton.displayName = 'SearchByCarButton'
