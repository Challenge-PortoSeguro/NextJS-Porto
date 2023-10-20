import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/page'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Porto Assistant',
  description: 'App para melhorar a assertividade dos modais da Porto',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
          <Header />
          {children}
      </body>
    </html>
  )
}
