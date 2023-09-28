import './globals.css'
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ProviderLayout from '@/components/ProviderLayout';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ambisius Coding Challenge',
  description: 'Ambisius Coding Challenge',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderLayout>
          { children }
        </ProviderLayout>
      </body>
    </html>
  )
}
