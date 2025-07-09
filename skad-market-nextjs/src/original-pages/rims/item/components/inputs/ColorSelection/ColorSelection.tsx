import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import css from './ColorSelection.module.scss'
import { rimsStore } from '@/entities/Rims/model/rimsStore'
import { ColorItem } from '@/shared/ui/ColorFilter/ColorFilter'
import { generatePath, useNavigate } from 'react-router-dom'
import { appRoutes } from '@/app-settings'
import { Flex } from 'antd'

export const ColorSelection = observer(() => {
  const navigate = useNavigate()
  const { currentRim, setSelectedColor, currentRimAllColors } = rimsStore

  return (
    <div className={css.holder}>
      <Flex style={{ fontSize: 12, lineHeight: '20px' }}>
        <span className={css.colorName}>Цвет:</span>
        <span className={css.colorValue}>{currentRim?.colorName}</span>
      </Flex>

      <div>
        {currentRimAllColors.map(({ color, colorName, wheelCode }) => {
          const disabled = false

          return (
            <button
              key={`rim-colors-${colorName}`}
              className={classNames(
                css.color,
                currentRim?.colorName === colorName && css.colorSelected,
                disabled && css.colorDisabled,
              )}
              onClick={() => navigate(generatePath(appRoutes.rimsItem, { wheelCode }), { replace: false })}
              disabled={disabled}
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
      </div>
    </div>
  )
})
