import { FC } from 'react'
import { Helmet } from 'react-helmet'

interface IMetatag {
  title: string
  label: string
}

const getColors = (label: string) => {
  switch (label) {
    case 'Белый':
      return {
        label1: 'Белые',
        label2: 'белого',
      }
    case 'Черный':
      return {
        label1: 'Черные',
        label2: 'черного',
      }
    case 'Алмаз черный':
      return {
        label1: 'Алмазно-черные',
        label2: 'алмазно-черного',
      }
    case 'Серебристый':
      return {
        label1: 'Серебристые',
        label2: 'серебристого',
      }
    case 'Темно-серебристый':
      return {
        label1: 'Темно-серебристые',
        label2: 'темно-серебристого',
      }
    default:
      return {
        label1: '',
        label2: '',
      }
  }
}

export const generateMetaTag = (title: string, label: string) => {
  switch (title) {
    case 'Диаметр':
      return {
        title: `Литые диски R${label} - купить колесные диски ${label} диаметра (радиуса) с доставкой`,
        header: `Литые диски R${label}`,
      }
    case 'Диаметр расположения отверстий':
      return {
        title: `Литые диски DIA ${label} - купить колесные диски с диаметром центрального отверстия ${label} с доставкой`,
        header: `Литые диски DIA${label}`,
      }
    case 'Вылет':
      return {
        title: `Литые диски ET${label} - купить колесные диски с вылетом ${label}  с доставкой`,
        header: `Литые диски ET${label}`,
      }
    case 'Ширина':
      return {
        title: `Литые диски ширина ${label} - купить колесные диски с шириной обода ${label}J с доставкой`,
        header: `Литые диски ширина ${label}`,
      }
    case 'Цвет':
      return {
        title: `${getColors(label).label1} литые диски - купить колесные диски ${
          getColors(label).label2
        } цвета с доставкой`,
        header: `${getColors(label).label1} литые диски`,
      }
    case 'Бренды':
      return {
        title: `Литые диски ${label} - купить колесные диски ${label} с доставкой`,
        header: `Литые диски ${label}`,
      }
  }
}

export const MetaTag: FC<IMetatag> = ({ label, title }) => {
  const metatagConfig = generateMetaTag(title, label)

  return (
    <Helmet>
      <meta
        name='description'
        content={`<h1>${metatagConfig ? metatagConfig.header : label}</h1> Skadmarket - это большой выбор литых дисков с гарантией качества по ценам от производителя. Доставка по всей России`}
      />
      <title>{metatagConfig ? metatagConfig.title : title}</title>
    </Helmet>
  )
}

// export const MetaTagsContainer: FC<IMetaTagsContainer> = ({ title, header, children }) => {
//   return (
//     <>
//       <Helmet>
//         <meta
//           name='description'
//           content={`<h1>${header}</h1> Skadmarket - это большой выбор литых дисков с гарантией качества по ценам от производителя. Доставка по всей России`}
//         />
//         <title>{title}</title>
//       </Helmet>
//       {children}
//     </>
//   )
// }
