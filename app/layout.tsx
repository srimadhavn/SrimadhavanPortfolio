import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Srimadhavan Portfolio | Professional Developer',
  description: 'A showcase of my work, skills, and professional experience as a developer',
  keywords: ['portfolio', 'developer', 'web development', 'frontend', 'backend', 'full-stack'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-portfolio-url.com',
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
      <body className={inter.className}>
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
  );
}