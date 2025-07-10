import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@assets/typography/index.css'
import '@shared/ui/styles/normalize.css'
import '@shared/ui/styles/variables.css'
import './globals.css'
import { installExtensions } from '@/shared/extensions'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Skad Market - Интернет-магазин шин и дисков',
  description: 'Интернет-магазин шин и дисков Skadmarket с доставкой',
}

// Устанавливаем расширения при инициализации
if (typeof window !== 'undefined') {
  installExtensions()
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}