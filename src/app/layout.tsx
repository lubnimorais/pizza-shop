import type { Metadata } from 'next';

import { Geist, Geist_Mono } from 'next/font/google';

import { Toaster } from 'sonner';

import { QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/components/Theme/ThemeProvider';

import { queryClient } from '@/lib/react-query';

import '../styles/globals.css';
import { MSWComponent } from '@/components/MSWComponent';

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
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class">
            <Toaster richColors />

            {/* <MSWComponent /> */}

            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
