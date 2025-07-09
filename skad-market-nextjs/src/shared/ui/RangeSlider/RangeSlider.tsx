import React from 'react'
import cn from 'classnames'
import css from './Slider.module.scss'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

interface SliderProps {
  className?: string
  min: number
  max: number
  onChange: (value: number | number[]) => void
  value: number[]
}

export const RangeSlider = ({ min, max, className, value, onChange }: SliderProps) => {
  return (
    <div className={cn(css.sliderContainer, className)}>
      <Slider range allowCross={false} onChange={onChange} min={min} max={max} value={value} />
    </div>
  )
}

RangeSlider.displayName = 'RangeSlider'
