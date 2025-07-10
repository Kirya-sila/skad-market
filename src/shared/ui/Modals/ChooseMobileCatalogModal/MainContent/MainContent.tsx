'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchInput } from '../../../SearchInput'
import css from './MainContent.module.scss'
import { appRoutes } from '@/app-settings'
import { SearchByCar } from '@/pages/rims/catalog/ui/SearchByCar'
import { useInput } from '@/shared/libs/hooks/useInput'
import { CategoryLine } from '@/widgets'

interface IMainContentprops {
  onClose: VoidFunction
}

export const MainContent: FC<IMainContentprops> = ({ onClose }) => {
  const router = useRouter()
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [productSearchText, , onChangeProductSearchText] = useInput()

  useEffect(() => {
    if (productSearchText?.length > 0) {
      setSuggestions([
        'Литые диски Арнар (КС904) 7.000xR16 5x114.3 DIA67.1 ET45',
        'Шины Арнар (КС1039) 7.500xR19 5x112 DIA66.6 ET34',
        'Литые диски Арнар (КС445) 6.000xR14 4x113.3 DIA44 ET40',
      ])
      // setSearching(true)
    } else {
      setSuggestions([])
    }
  }, [productSearchText])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchByCar = useCallback(() => router.push(appRoutes.rims), [router])

  // const handleFocus = () => {
  //   setSearching(true)
  // }

  return (
    <div className={css.mainContent}>
      <div>
        <SearchInput
          // onFocus={handleFocus}
          //   onBlur={handleBlur}
          className={css.search}
          value={productSearchText}
          suggestions={suggestions}
          onChange={onChangeProductSearchText}
        />
      </div>
      <div className={css.footer}>
        <SearchByCar onClick={handleSearchByCar} />
        <CategoryLine onClick={onClose} />
      </div>
    </div>
  )
}
