import { ChangeEvent } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import css from './CheckboxListItem.module.scss'

export interface CheckboxListItemProps {
  className?: string
  label?: string
  disabled?: boolean
  error?: boolean
  checked?: boolean
  inFront?: boolean
  onCheck?: (value: ChangeEvent<HTMLInputElement>) => void
}

export const CheckboxListItem = observer(
  ({ className, label, disabled, error, checked, inFront = false, onCheck }: CheckboxListItemProps) => {

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation()
      if (onCheck) {
        onCheck(e)
      }
    }

    return (
      <div
        className={cn(css.checkboxListItem, className, {
          [css.disabled]: disabled,
          [css.checked]: checked,
          [css.error]: error,
        })}
      >
        <label>
          {label && inFront && <div className={cn(css.text, { [css.labelInFront]: inFront })}>{label}</div>}
          <input type='checkbox' checked={checked} disabled={disabled || error} onChange={onChange} />
          <span>
            <svg width='12' height='9' viewBox='0 0 12 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M11.3873 0.150491C11.7068 0.388447 11.7597 0.823852 11.5056 1.123L5.37847 8.33574C5.0193 8.75855 4.34114 8.77947 3.95303 8.3797L0.525231 4.84897C0.250639 4.56614 0.272899 4.12841 0.57495 3.87129C0.877 3.61416 1.34446 3.635 1.61905 3.91784L4.61824 7.00709L10.3487 0.261283C10.6029 -0.037861 11.0678 -0.0874642 11.3873 0.150491Z'
                fill='white'
              />
            </svg>
          </span>
          {label && !inFront && <div className={css.text}>{label}</div>}
        </label>
      </div>
    )
  },
)

CheckboxListItem.displayName = 'CheckboxListItem'
