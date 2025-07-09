import { FC } from 'react'
import { Characteristic } from '../../Characteristic'
import { getCharacteristicValue } from '../utils'
import { RimDTO } from '@/entities/Rims/model/types'
import { ILocalType } from '@/pages/rims'

interface ICharacteristicProps {
  classname?: string
  list: (keyof ILocalType)[]
  currentRim: RimDTO
}

export const CharacteristicList: FC<ICharacteristicProps> = ({ classname, list, currentRim }) => {
  return (
    <div className={classname}>
      {list.map((x, index) => (
        <Characteristic
          key={`characteristic-all-${x}-${index}`}
          title={x}
          value={getCharacteristicValue(currentRim, x)}
        />
      ))}
    </div>
  )
}
