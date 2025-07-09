import { useCallback, useEffect, useState } from 'react'

interface IReturnedProps {
  copyToClipboard: (value: string | null) => void
  resetCopied: () => void
  isCopied: boolean
  open: boolean
}

export const useCopyToClipboard = (): IReturnedProps => {
  const [open, setOpen] = useState(false)
  const [isCopied, setCopied] = useState(false)

  const resetCopied = useCallback(() => {
    setCopied(false)
  }, [])

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (!newOpen) {
        resetCopied()
      }
      setOpen(newOpen)
    },
    [resetCopied],
  )

  useEffect(() => {
    let timeOutId: undefined | ReturnType<typeof setTimeout>
    if (isCopied) {
      handleOpenChange(true)
      timeOutId = setTimeout(() => handleOpenChange(false), 1200)
    }

    return () => clearTimeout(timeOutId)
  }, [handleOpenChange, isCopied])

  const copyToClipboard = (value: string | null) => {
    if (typeof value !== 'string') {
      return
    }
    navigator.clipboard
      .writeText(value)
      .then(() => setCopied(true))
      .catch((e) => console.log('Err: ', e.message))
  }

  return { copyToClipboard, isCopied, resetCopied, open }
}
