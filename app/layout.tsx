import type { Metadata } from 'next'
import './globals.css'
import { Oswald } from 'next/font/google'

const oswald = Oswald({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  icons: 'cartoonpf.PNG',
  title: 'PrakVisal',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={oswald.className}>{children}</body>
    </html>
  )
}
