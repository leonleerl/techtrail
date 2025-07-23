import type { Metadata } from 'next'
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
