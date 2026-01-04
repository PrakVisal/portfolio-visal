import './globals.css'
import { Oswald } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider'

const oswald = Oswald({ subsets: ['latin'], weight: ['400', '500', '700'] })

// app/page.tsx or app/portfolio/page.tsx
export const metadata = {
  icons: "cartoonpf-modified.png",
  title: "Prak Visal | Backend Developer",
  description: "Portfolio of Prak Visal, Backend Developer based in Cambodia.",
  keywords: "UI/UX, Designer, Developer, Portfolio, Cambodia, Prak Visal, Backend Developer, prakvisal, visal, visalprak, fullstack, backend, frontend, developer, portfolio, cambodia, prakvisal, backenddeveloper, fullstackdeveloper, frontenddeveloper, portfolio, cambodia, prakvisal, backenddeveloper, fullstackdeveloper, frontenddeveloper",
  openGraph: {
    title: "Prak Visal | Backend Developer",
    description: "Portfolio of Prak Visal, UI/UX Designer and Backend Developer based in Cambodia.",
    url: "https://prakvisal.vercel.app",
    images: [
      {
        url: "https://prakvisal.vercel.app/pf.jpg",
        width: 800,
        height: 600,
        alt: "Prak Visal Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prak Visal | Backend Developer",
    description: "Portfolio of Prak Visal, Backend Developer based in Cambodia.",
    images: ["https://prakvisal.vercel.app/pf.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={oswald.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
