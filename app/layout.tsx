import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "TricretParse - AI-Powered Natural Language to JSON Converter",
  description: "Transform natural language requests into structured JSON data with AI precision. Free online tool for developers, data analysts, and API integration. Convert text to JSON instantly.",
  keywords: ["JSON converter", "natural language processing", "AI tool", "text to JSON", "API development", "data transformation", "structured data", "developer tools", "free online converter"],
  authors: [{ name: "TricretA" }],
  creator: "TricretA",
  publisher: "TricretA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://prompt-to-json.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "TricretParse - AI-Powered Natural Language to JSON Converter",
    description: "Transform natural language requests into structured JSON data with AI precision. Free online tool for developers and data analysts.",
    url: 'https://prompt-to-json.vercel.app',
    siteName: 'TricretParse',
    locale: 'en_US',
    type: 'website',
    images: [
       {
         url: '/og-image.svg',
         width: 1200,
         height: 630,
         alt: 'TricretParse - Natural Language to JSON Converter',
         type: 'image/svg+xml',
       },
     ],
  },
  twitter: {
     card: 'summary_large_image',
     title: "TricretParse - AI JSON Converter",
     description: "Convert natural language to JSON with AI precision. Free developer tool.",
     images: ['/twitter-image.svg'],
   },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/og-image.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/twitter-image.svg" as="image" type="image/svg+xml" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        
        {/* Favicon */}
        <link rel="icon" href="/placeholder-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/placeholder-logo.svg" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
