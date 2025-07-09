import React, { ReactNode } from 'react'
import { ImageLoader } from '@shared/ui/ImageLoader'

export const createImageList = (...srcList: string[]): ReactNode[] => {
  return srcList.map((src) => <ImageLoader key={src} src={src} />)
}
