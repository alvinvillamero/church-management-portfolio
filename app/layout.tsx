import type { Metadata } from 'next'
import './globals.css'
import ToastProvider from '@/components/ToastProvider'

export const metadata: Metadata = {
  title: 'UPC VOT MINTAL - Church Membership System (Portfolio)',
  description: 'Portfolio demo of church membership management system with QR code attendance tracking',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}

