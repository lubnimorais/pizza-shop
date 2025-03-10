import type { Metadata } from 'next';

import { Geist, Geist_Mono } from 'next/font/google';

import { Toaster } from 'sonner';

import { ThemeProvider } from '@/components/Theme/ThemeProvider';

import '../styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'pizza.shop',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute='class'>
          <Toaster richColors />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
