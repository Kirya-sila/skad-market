import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { MetaTag } from '@/shared/ui'

export const CatalogMetatags = () => {
  const { activeBrand, activeModel, currentCar } = searchCarStore

  const getProps = (brand: string, model: string) => {
    return {
      label: `Литые диски на ${brand} ${model}`,
      title: `Литые диски на ${brand} ${model} - купить колесные диски для ${brand} ${model} с доставкой`,
    }
  }

  const specificMetatag = () => {
    if (currentCar) {
      return <MetaTag {...getProps(currentCar.firm, currentCar.model)} />
    }

    if (activeBrand || activeModel) {
      return <MetaTag {...getProps(activeBrand ?? '', activeModel ?? '')} />
    }

    return null
  }

  return (
    <>
      <MetaTag title='Диски - купить колесные диски на авто с доставкой, цены от производителя' label='Диски на авто' />
      {specificMetatag()}
    </>
  )
}
