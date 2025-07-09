import css from './CatalogButtons.module.scss'
import { CatalogButtons as Buttons } from '@/shared/ui'

export const CatalogButtons = () => {
  return <Buttons className={css.catalogButtons} gap={24} />
}
