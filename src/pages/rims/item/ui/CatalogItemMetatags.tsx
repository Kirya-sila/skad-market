import { FC } from 'react'
import { MetaTag } from '@/shared/ui'

export const CatalogItemMetatags: FC<{ rimTitle: string }> = ({ rimTitle }) => {
  return (
    <>
      <MetaTag
        title='Литые диски - купить легкосплавные диски на авто с доставкой, цены от производителя'
        label='Литые диски'
      />
      <MetaTag title={`Купить литые диски ${rimTitle} от производителя с доставкой`} label={`Литые диски ${rimTitle}`} />
    </>
  )
}
