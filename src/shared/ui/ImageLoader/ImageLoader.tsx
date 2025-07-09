import React, { CSSProperties, SyntheticEvent, useCallback } from 'react'
import fallbackImageSrc from '@assets/images/NoPhoto.png'

interface ImageLoaderProps {
  src?: string
  alt?: string
  placeholder?: string
  className?: string
  style?: CSSProperties
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
}: ImageLoaderProps): React.ReactElement => {
  // const [loaded, setLoaded] = useState(false)
  // const [error, setError] = useState(false)
  // const imgRef = useRef<HTMLImageElement>(null)

  // useEffect(() => {
  //   if (imageCache.has(src)) {
  //     setLoaded(true)
  //     return
  //   }
  //
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting && imgRef.current) {
  //         const img = new Image()
  //         img.src = src
  //         img.onload = () => {
  //           setLoaded(true)
  //           imageCache.add(src)
  //         }
  //         img.onerror = () => {
  //           setError(true)
  //         }
  //       }
  //     })
  //   })
  //
  //   if (imgRef.current) {
  //     observer.observe(imgRef.current)
  //   }
  //
  //   return () => {
  //     observer.disconnect()
  //   }
  // }, [src])

  const handleError = useCallback(() => {
    return ({ currentTarget }: SyntheticEvent<HTMLImageElement>) => {
      currentTarget.onerror = null
      currentTarget.src = fallbackImageSrc
    }
  }, [])

  return (
    <img
      loading='lazy'
      // ref={imgRef}
      // src={error ? placeholder : src}
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      style={style}
    />
  )
}
