import React, { FC } from 'react'
import cn from 'classnames'
import css from './ColorFilter.module.scss'
import { Colors } from '@/shared/types'

export interface ColorFilterProps {
  onChange?: (color: Colors) => void
  available?: boolean
  className?: string
  disabled?: boolean
  active?: boolean
  label?: string
  color: Colors
}

const shortColor = {
  // [Colors.DiamondWhite]: 'diamondWhite',
  // [Colors.DiamondMatte]: 'diamomdMatte',
  [Colors.DiamondBlack]: 'diamondBlack',
  [Colors.Black]: 'black',
  [Colors.White]: 'white',
  [Colors.DarkSilver]: 'diamondSilver',
  [Colors.Silver]: 'silver',
}

export const ColorFilter = ({
  color = Colors.Silver,
  available = true,
  className,
  onChange,
  disabled,
  active,
  label,
}: ColorFilterProps) => {
  const hasLabel = typeof label === 'string'
  
  const handleChangeColor = () => {
    onChange?.(color)
  }

  return (
    <button
      onClick={handleChangeColor}
      disabled={disabled}
      className={cn(css.colorFilter, className, {
        [css.labeled]: hasLabel,
        [css.active]: active,
        [css.notAvailable]: !available,
      })}
    >
      <ColorItem color={color} label={label} />
    </button>
  )
}

type ColorItemProps = {
  color: Colors
  label?: string
}

export const ColorItem: FC<ColorItemProps> = ({ color, label }) => (
  <>
    <div className={cn(css.thumbnail, css[shortColor[color]])}></div>
    <div className={css.label}>{label}</div>
  </>
)

ColorFilter.displayName = 'ColorFilter'
