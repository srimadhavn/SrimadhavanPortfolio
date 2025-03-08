import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from "@vercel/analytics/react"
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Srimadhavan Portfolio | Professional Developer',
  description: 'A showcase of my work, skills, and professional experience as a developer',
  keywords: ['portfolio', 'developer', 'web development', 'frontend', 'backend', 'full-stack'],
  authors: [{ name: 'Srimadhavan' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://srimadhavan.vercel.app/',
    title: 'Srimadhavan Portfolio | Professional Developer',
    description: 'A showcase of my work, skills, and professional experience as a developer',
    siteName: 'Maddy Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Srimadhavan Portfolio | Professional Developer',
    description: 'A showcase of my work, skills, and professional experience as a developer',
    creator: '@yourtwitterhandle',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}