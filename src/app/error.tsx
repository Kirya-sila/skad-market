'use client'

import { Button, Result } from 'antd'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Result
      status="500"
      title="Что-то пошло не так!"
      subTitle="Произошла ошибка при загрузке страницы."
      extra={
        <Button type="primary" onClick={reset}>
          Попробовать снова
        </Button>
      }
    />
  )
}