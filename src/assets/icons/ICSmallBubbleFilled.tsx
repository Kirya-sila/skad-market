import React from 'react'

interface ICSmallBubbleFilledProps {
  className?: string
}

export const ICSmallBubbleFilled = ({ className }: ICSmallBubbleFilledProps) => {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.99951 9.50394L3.42014 13.0833V9.50394H1.98839C1.20093 9.50394 0.556641 8.85965 0.556641 8.07219V1.62932C0.556641 0.841858 1.20093 0.197571 1.98839 0.197571H12.0106C12.7981 0.197571 13.4424 0.841858 13.4424 1.62932V8.07219C13.4424 8.85965 12.7981 9.50394 12.0106 9.50394H6.99951Z"
        fill="#909799"
      />
    </svg>
  )
}

ICSmallBubbleFilled.displayName = 'ICSmallBubbleFilled'
