import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ConfigProvider } from 'antd'
import { observer } from 'mobx-react-lite'
// import { theme } from '@/theme'
// import { Toast } from '@/widgets'
// import { SnackBarRenderer } from '@/features/notification'
// import { AuthorizationModal } from '@/shared/ui'
// import { ModalRenderer } from '@/app/config/modal/modal.renderer'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SKAD Market',
  description: 'SKAD Market - Your trusted marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider>
          {/* <Toast /> */}
          {children}
          {/* <ModalRenderer />
          <SnackBarRenderer />
          <AuthorizationModal /> */}
        </ConfigProvider>
      </body>
    </html>
  )
}