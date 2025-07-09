import React from 'react'
import cn from 'classnames'
import css from './CircleProgress.module.scss'

interface CircleProgressProps {
  className?: string
  current: number
  total: number
  radius?: number // Добавляем новый пропс для радиуса
  strokeWidth?: number // Добавляем новый пропс для толщины линии
}

export const CircleProgress = ({
  className,
  current,
  total,
  radius = 50, // Значение по умолчанию для радиуса
  strokeWidth = 10, // Значение по умолчанию для толщины линии
}: CircleProgressProps) => {
  const circumference = 2 * Math.PI * radius
  const progress = total > 0 ? (1 - current / total) * circumference : 0

  const progressStyle = {
    transition: 'stroke-dashoffset 0.5s ease 0s',
  }

  const svgSize = (radius + strokeWidth) * 2

  const textYPosition = radius + strokeWidth + 1

  return (
    <div className={cn(css.circleProgress, className)}>
      <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
        <circle
          r={radius}
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          strokeWidth={strokeWidth}
          className={css.backgroundCircle}
        />
        <circle
          r={radius}
          style={progressStyle}
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          strokeWidth={strokeWidth}
          strokeDashoffset={progress}
          className={css.progressCircle}
          strokeDasharray={`${circumference} ${circumference}`}
          transform={`rotate(-90 ${radius + strokeWidth} ${radius + strokeWidth})`}
        />
        <text x={radius + strokeWidth} y={textYPosition} role="progress-counter" className={css.counter}>
          {current}
        </text>
      </svg>
    </div>
  )
}

CircleProgress.displayName = 'CircleProgress'
