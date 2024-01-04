'use client'
import './globals.css'
import Providers from './provider'
import { Inter } from 'next/font/google'
import { i18n } from '@/i18n.config'
import { ReduxProvider } from '../components/providers/redux.provider'
const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={inter.className}>
        <ReduxProvider>
          <Providers>
            {/* <MainNav /> */}
            {/* <LocaleSwitcher /> */}
            {children}
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  )
}
