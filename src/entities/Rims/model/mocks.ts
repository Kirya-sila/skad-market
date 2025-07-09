import { Price, Rim } from '@/entities/Rims/model/types'
import ProductCardImage5 from '@assets/images/product_card_image_5.png'
import ProductCardImage6 from '@assets/images/product_card_image_6.png'
import ProductCardImage7 from '@assets/images/product_card_image_7.png'
import ProductCardImage8 from '@assets/images/product_card_image_8.png'
import ProductCardImage9 from '@assets/images/product_card_image_9.png'
import ProductCardImage10 from '@assets/images/product_card_image_10.png'
import ProductCardImage11 from '@assets/images/product_card_image_11.png'
import ProductCardImage12 from '@assets/images/product_card_image_12.png'
import ProductCardImage13 from '@assets/images/product_card_image_13.png'
import ProductCardImage14 from '@assets/images/product_card_image_14.png'
import ProductCardImage15 from '@assets/images/product_card_image_15.png'
import { PromoButtonProps } from '@shared/ui'
import { getRandomElement } from '@shared/libs/utils/array'

const imagesArray = [
  ProductCardImage5,
  ProductCardImage6,
  ProductCardImage7,
  ProductCardImage8,
  ProductCardImage9,
  ProductCardImage10,
  ProductCardImage11,
  ProductCardImage12,
  ProductCardImage13,
  ProductCardImage14,
  ProductCardImage15,
]

const generateRandomPrice = (): Price => ({
  current: Math.floor(Math.random() * 20000) + 3000,
  old: Math.random() > 0.3 ? Math.floor(Math.random() * 20000) + 3000 : undefined,
  supTitle: Math.random() > 0.5 ? 'Sale' : undefined,
})
export const getRandomLabels = (id: string) => {
  return /* +id.at(-1)! > 7 ? [{ label: 'Черная пятница' }] :  */[] //commented by Svetlana's request
}

const generatePromoButtons = (): PromoButtonProps[] => {
  if (Math.random() > 0.8) {
    return [
      {
        label: 'Новинки',
        variant: 'primary',
        onClick: () => console.log('New Arrival clicked'),
        className: 'new-arrival',
      },
      {
        label: 'Чёрная пятница',
        variant: 'secondary',
        onClick: () => console.log('Discounted clicked'),
        className: 'discounted',
      },
    ]
  } else if (Math.random() > 0.5) {
    return [
      {
        label: 'Новинки',
        variant: 'primary',
        onClick: () => console.log('New Arrival clicked'),
        className: 'new-arrival',
      },
    ]
  } else {
    return []
  }
}

const hashString = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0
  }
  return Math.abs(hash)
}

export const getRandomImages = (id: string) => {
  const numImages = +id.at(-1)! / 3
  const seed = hashString(id)
  const randomImages: typeof imagesArray = []

  for (let i = 0; i < numImages; i++) {
    const index = (seed + i) % imagesArray.length
    randomImages.push(imagesArray[index])
  }

  return randomImages
}

export const generateRandomRim = (): Rim => {
  const numImages = Math.floor(Math.random() * 5)
  const randomImages = Array.from(
    { length: numImages },
    () => imagesArray[Math.floor(Math.random() * imagesArray.length)],
  )
  const deliveryDate = Date.now() + (Math.floor(Math.random() * 10) + 1) * 24 * 3600 * 1000

  const titleTemplates = [
    'Шина {brand} {model} {diameter}/{width} R{rimSize}',
    'Литые диски {model} {width}xR{rimSize} {boltCount}x{pcd} DIA{centralHoleDiameter} ET{offset}',
    'Датчик давления в шинах {brand} {model} для {randomCarModel}',
    'Автомобильный компрессор {brand} {model}',
    'Гайка {details} {brand} {model}',
    'Литые диски {brand} (КС913) {width}xR{rimSize} {boltCount}x{pcd} DIA{centralHoleDiameter} ET{offset} {color}',
  ]

  const randomTitleTemplate = titleTemplates[Math.floor(Math.random() * titleTemplates.length)]

  const title = randomTitleTemplate
    .replace(
      '{brand}',
      ['Michelin', 'Bridgestone', 'Pirelli', 'Continental', 'Goodyear'][Math.floor(Math.random() * 5)],
    )
    .replace('{model}', `Model ${Math.random().toString(36).substring(2, 6)}`)
    .replace('{diameter}', `${Math.floor(Math.random() * 20) + 13}`)
    .replace('{width}', `${Math.floor(Math.random() * 10) + 5}`)
    .replace('{rimSize}', `${Math.floor(Math.random() * 30) + 14}`)
    .replace('{boltCount}', `${[4, 5, 6][Math.floor(Math.random() * 3)]}`)
    .replace('{pcd}', `${[100, 108, 112, 114, 120][Math.floor(Math.random() * 5)]}`)
    .replace('{centralHoleDiameter}', `${Math.floor(Math.random() * 20) + 50}`)
    .replace('{offset}', `${Math.floor(Math.random() * 50) + 20}`)
    .replace('{color}', ['черный', 'серебряный', 'серый', 'белый', 'золотой'][Math.floor(Math.random() * 5)])
    .replace('{randomCarModel}', ['BMW X3 2018', 'Audi Q5 2020', 'Tesla Model S'][Math.floor(Math.random() * 3)])
    .replace('{details}', '12х1,5 Набор 44 блистер 20шт. спец конус/открытая 19мм Gold AL-116 20+1 LS')

  return {
    id: Math.random().toString(36).substring(2, 15),
    diameter: getRandomElement([14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30])!,
    width: getRandomElement([5, 5.5, 6, 7, 7.5, 8])!,
    name: `Rim ${Math.random().toString(36).substring(2, 6)}`,
    color: getRandomElement(['black', 'silver', 'grey', 'white', 'gold'])!,
    boltCount: getRandomElement([4, 5, 6])!,
    pcd: getRandomElement([100, 108, 112, 114, 120])!,
    offset: Math.floor(Math.random() * 50) + 20,
    centralHoleDiameter: Math.floor(Math.random() * 20) + 50,
    isNew: Math.random() > 0.5,
    isHit: Math.random() < 0.5,
    brand: getRandomElement(['Michelin', 'Bridgestone', 'Pirelli', 'Continental', 'Goodyear'])!,
    model: `Model ${Math.random().toString(36).substring(2, 6)}`,
    loadIndex: Math.floor(Math.random() * 100) + 50,
    quantity: Math.floor(Math.random() * 100) + 1,
    labels: generatePromoButtons(),
    title: title,
    price: generateRandomPrice(),
    images: randomImages,
    deliveryDate,
  }
}
