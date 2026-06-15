import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'JSForge Runtime — JavaScript Runtime Built in C++',
    template: '%s | JSForge Runtime',
  },
  description: 'An educational JavaScript Runtime built entirely in C++. Explore the lexer, parser, AST, and interpreter. Test your JavaScript code online.',
  keywords: ['JavaScript runtime', 'C++', 'lexer', 'parser', 'AST', 'interpreter', 'compiler', 'hackathon'],
  authors: [{ name: 'JSForge Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'JSForge Runtime',
    description: 'Educational JavaScript Runtime built in C++',
    siteName: 'JSForge Runtime',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-dark-bg text-slate-200 font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
