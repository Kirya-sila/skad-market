import { Flex } from 'antd'
import cn from 'classnames'
import css from './Spinner.module.scss'

export interface SpinnerProps {
  className?: string
}

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <Flex justify='center' align='center' style={{ width: '100%' }}>
      <svg
        className={cn(css.spinner, className)}
        width='40px'
        height='40px'
        viewBox='0 0 66 66'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle className={css.path} fill='none' strokeWidth='6' strokeLinecap='round' cx='33' cy='33' r='30'></circle>
      </svg>
    </Flex>
  )
}

Spinner.displayName = 'Spinner'
