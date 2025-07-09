import React from 'react'
import { CustomArrowProps } from '@ant-design/react-slick'

export interface SliderRightArrowProps extends CustomArrowProps {
  className?: string
}

export const SliderRightArrow = ({ slideCount, currentSlide, ...props }: SliderRightArrowProps) => {
  return (
    <div {...props}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="35" height="35" rx="9.5" fill="white" fillOpacity="0.4" />
        <rect x="0.5" y="0.5" width="35" height="35" rx="9.5" stroke="#E5E9EB" />
        <path
          d="M15.2536 24.7588C14.9155 24.4372 14.9155 23.9158 15.2536 23.5942L21.1341 18L15.2536 12.4059C14.9155 12.0842 14.9155 11.5628 15.2536 11.2412C15.5916 10.9196 16.1398 10.9196 16.4778 11.2412L22.588 17.0537C23.1373 17.5763 23.1373 18.4236 22.588 18.9462L16.4778 24.7588C16.1398 25.0804 15.5916 25.0804 15.2536 24.7588Z"
          fill="#2D2F31"
          fillOpacity="0.6"
        />
      </svg>
    </div>
  )
}

SliderRightArrow.displayName = 'SliderRightArrow'
