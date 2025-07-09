import React from 'react'
import { CustomArrowProps } from '@ant-design/react-slick'

export interface SliderLeftArrowProps extends CustomArrowProps {
  className?: string
}

export const SliderLeftArrow = ({ slideCount, currentSlide, ...props }: SliderLeftArrowProps) => {
  return (
    <div {...props}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="35" height="35" rx="9.5" fill="white" fillOpacity="0.4" />
        <rect x="0.5" y="0.5" width="35" height="35" rx="9.5" stroke="#E5E9EB" />
        <path
          d="M20.7464 11.2412C21.0845 11.5628 21.0845 12.0842 20.7464 12.4059L14.8659 18L20.7464 23.5941C21.0845 23.9158 21.0845 24.4372 20.7464 24.7588C20.4084 25.0804 19.8602 25.0804 19.5222 24.7588L13.412 18.9463C12.8627 18.4237 12.8627 17.5764 13.412 17.0538L19.5222 11.2412C19.8602 10.9196 20.4084 10.9196 20.7464 11.2412Z"
          fill="#2D2F31"
          fillOpacity="0.6"
        />
      </svg>
    </div>
  )
}

SliderLeftArrow.displayName = 'SliderLeftArrow'
