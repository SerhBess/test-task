import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Sidebar from '@/components/sidebar';

import { Providers } from './providers';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FlowFox - Marketing Creatives Generator',
  description: 'Generate AI-powered marketing headlines and images',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
