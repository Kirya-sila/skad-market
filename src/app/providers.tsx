'use client'

import { useEffect } from 'react'
import { installExtensions } from '@/shared/extensions'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    installExtensions()
  }, [])

  return <>{children}</>
}