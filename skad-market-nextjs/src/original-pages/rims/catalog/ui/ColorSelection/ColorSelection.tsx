import { FC } from 'react'
import { Flex } from 'antd'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import css from './ColorSelection.module.scss'
import { Colors } from '@/shared/types'
import { ColorItem } from '@/shared/ui/ColorFilter/ColorFilter'

interface IColors {
  colors: { colorName: string; color: Colors }[]
  onCheckColor: (colorIndex: number) => void
  currentSlide: number
}

export const ColorSelection: FC<IColors> = observer(({ colors, onCheckColor, currentSlide }) => {
  return (
    <Flex vertical gap={4}>
      {colors.map(({ color, colorName }, i) => {
        return (
          <button
            key={`rim-colors-${colorName}`}
            className={classNames(css.color, currentSlide === i && css.colorSelected)}
            onClick={() => onCheckColor(i)}
          >
            <ColorItem color={color} />
            {/* {disabled && (
                <div className={css.redLineDisabled}>
                  <RedLineDisabled />
                </div>
              )} */}
          </button>
        )
      })}
    </Flex>
  )
})
