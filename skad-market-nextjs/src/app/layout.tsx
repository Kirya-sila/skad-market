import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ConfigProvider } from 'antd'
import { observer } from 'mobx-react-lite'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
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

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider>
            {/* <Toast /> */}
            {children}
            {/* <ModalRenderer />
            <SnackBarRenderer />
            <AuthorizationModal /> */}
            <ReactQueryDevtools initialIsOpen={false} />
          </ConfigProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}