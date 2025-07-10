import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ConfigProvider } from 'antd'
import ruRU from 'antd/locale/ru_RU'
import '@assets/typography/index.css'
import '@shared/ui/styles/normalize.css'
import '@shared/ui/styles/variables.css'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Skad Market - Интернет-магазин шин и дисков',
  description: 'Интернет-магазин шин и дисков Skadmarket с доставкой',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <ConfigProvider locale={ruRU}>
          <Providers>
            {children}
          </Providers>
        </ConfigProvider>
      </body>
    </html>
  )
}