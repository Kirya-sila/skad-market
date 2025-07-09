import React from 'react'

interface ICStarFilledProps {
  className?: string
}

export const ICStarFilled = ({ className }: ICStarFilledProps) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.52584 1.1028C7.67702 0.645372 8.32406 0.645328 8.47531 1.10274L10.0608 5.89785L14.953 6.00319C15.4206 6.01325 15.6196 6.60252 15.2539 6.89405L11.3341 10.0186L12.7467 14.9283C12.8785 15.3863 12.3556 15.7515 11.971 15.4701L7.99976 12.5648L4.03008 15.4698C3.64545 15.7512 3.12251 15.386 3.2543 14.928L4.66686 10.0186L0.747804 6.89419C0.382087 6.60263 0.581182 6.01336 1.04879 6.00335L5.94083 5.8986L7.52584 1.1028Z"
        fill="#F8D51F"
      />
    </svg>
  )
}

ICStarFilled.displayName = 'ICStarFilled'
