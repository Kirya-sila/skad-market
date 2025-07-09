import { FC } from 'react'

interface ICPlusProps {
  color?: string
  opacity?: number
}

export const ICPlus: FC<ICPlusProps> = ({ color = '#2D2F31', opacity = 0.6 }) => {
  return (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7 0C6.58582 0 6.25 0.335815 6.25 0.75V6.25H0.75C0.335815 6.25 0 6.58582 0 7C0 7.41418 0.335815 7.75 0.75 7.75H6.25V13.25C6.25 13.6642 6.58582 14 7 14C7.41418 14 7.75 13.6642 7.75 13.25V7.75H13.25C13.6642 7.75 14 7.41418 14 7C14 6.58582 13.6642 6.25 13.25 6.25H7.75V0.75C7.75 0.335815 7.41418 0 7 0Z'
        fill={color}
        fillOpacity={opacity.toString()}
      />
    </svg>
  )
}
