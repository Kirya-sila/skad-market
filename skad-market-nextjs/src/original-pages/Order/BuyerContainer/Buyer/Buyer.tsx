import { useState } from 'react'
import { SectionWrapper } from '../../SectionWrapper'
import { BuyerInfoModal } from './BuyerModal'
import { RegularButton } from '@/shared/ui'

// interface IBuyerInfo {}

export const Buyer = () => {
  const [open, setOpen] = useState(false)
  const onClose = () => {
    setOpen((prev) => !prev)
  }

  return <RegularButton onClick={onClose} appearance='secondary' size='small' text='Указать данные получателя >' />
}
