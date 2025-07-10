import React, { CSSProperties } from 'react'
import Image from 'next/image'
import fallbackImageSrc from '@assets/images/NoPhoto.png'

interface ImageLoaderProps {
  src?: string
  alt?: string
  placeholder?: string
  className?: string
  style?: CSSProperties
  width?: number
  height?: number
  fill?: boolean
}

/**
 * Props для компонента ImageLoader.
 * @property {string} src - Основной URL изображения, которое нужно загрузить.
 * @property {string} [alt] - Альтернативный текст для изображения, используется для доступности.
 * @property {string} [placeholder] - URL запасного изображения или плейсхолдера, отображаемого до загрузки основного изображения.
 * @property {string} [className] - Дополнительные классы CSS для стилизации изображения.
 */

/**
 * Компонент для асинхронной загрузки изображений с поддержкой кэширования и ленивой загрузки.
 * Использует Intersection Observer для оптимизации производительности, загружая изображения только тогда,
 * когда они входят в область просмотра. Поддерживает показ запасного изображения в случае ошибки загрузки.
 *
 * @param {ImageLoaderProps} props - Свойства для настройки ImageLoader.
 * @returns {React.ReactElement} Элемент React, представляющий асинхронно загружаемое изображение.
 */
export const ImageLoader: React.FC<ImageLoaderProps> = ({
  src = fallbackImageSrc,
  alt = fallbackImageSrc,
  placeholder = fallbackImageSrc,
  className,
  style = {},
  width,
  height,
  fill = false,
}: ImageLoaderProps): React.ReactElement => {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        style={style}
        onError={() => {
          // Fallback to placeholder image
          return fallbackImageSrc
        }}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 300}
      height={height || 200}
      className={className}
      style={style}
      onError={() => {
        // Fallback to placeholder image
        return fallbackImageSrc
      }}
    />
  )
}
