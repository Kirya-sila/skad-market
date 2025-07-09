import { FC } from 'react'
import { Tooltip } from '../Tooltip'
import { Dots as DotsIcon } from '@/assets/icons'

interface IDotsWithTooltip {
  tooltipContent: JSX.Element
  name: string
}

export const DotsWithTooltip: FC<IDotsWithTooltip> = ({ tooltipContent, name }) => {
  return (
    <div style={{ cursor: 'pointer' }}>
      <Tooltip id={name} content={tooltipContent} clickable place='bottom'>
        <div style={{ height: '20px' }}>
          <DotsIcon />
        </div>
      </Tooltip>
    </div>
  )
}
