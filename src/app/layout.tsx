import type { Metadata } from 'next'
import localFont from 'next/font/local'
import "./globals.css";
import Providers from '@/components/providers';

const alanSans = localFont({
  src: [
    {
      path: '../../public/fonts/AlanSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AlanSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AlanSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AlanSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AlanSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AlanSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AlanSans-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-alan-sans',
})

export const metadata: Metadata = {
  title: 'Leon\'s Blog',
  description: 'A blog platform for Leon',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={alanSans.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
