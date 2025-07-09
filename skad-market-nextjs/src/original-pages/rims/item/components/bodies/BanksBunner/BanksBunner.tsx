import { FC } from 'react'
import { HalvaSmall, SberSmall, TSmall } from '@/assets/icons'

interface IBanksBunner {
  classname?: string
}

export const BanksBunner: FC<IBanksBunner> = ({ classname }) => {
  return (
    <div className={classname}>
      <div>Рассрочка</div>
      <div>
        <div>
          <SberSmall /> <TSmall /> <HalvaSmall />
        </div>
      </div>
    </div>
  )
}
