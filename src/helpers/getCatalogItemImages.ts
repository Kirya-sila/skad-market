import { RimDTO, RimDTOImage } from '@/entities/Rims/model/types'

export const getCatalogItemImages = (images: RimDTO['images']) => {
  const imageUrls: string[] = []
  if (!images.length) {
    return []
  }

  images.forEach(({ type, url }) => {
    switch (type) {
      case 'preview':
        imageUrls[0] = url
        break
      case 'detail':
        imageUrls[1] = url
        break
      default:
        imageUrls[2] = url
    }
  })

  return imageUrls.filter(Boolean)
}
