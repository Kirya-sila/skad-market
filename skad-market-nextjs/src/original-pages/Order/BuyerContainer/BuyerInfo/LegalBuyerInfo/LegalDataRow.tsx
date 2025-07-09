import { FC } from 'react'
import { FlexRow } from '@/shared/ui'
import css from '../BuyerInfo.module.scss'

interface ILegalDataRow {
  label: string
  text: string
}

export const LegalDataRow: FC<ILegalDataRow> = ({ label, text }) => {
  return (
    <FlexRow classname={css.legalDataRow}>
      <span>{label}:</span>
      <span>{text}</span>
    </FlexRow>
  )
}
