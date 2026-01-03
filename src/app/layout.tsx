import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
  title: 'Pomodoro Focus - 集中力を高めるタイマーアプリ',
  description:
    '美しいUIでポモドーロテクニックを実践。25分の集中と5分の休憩で、生産性を最大化しましょう。統計機能で進捗を可視化。',
  keywords: ['ポモドーロ', 'タイマー', '集中', '生産性', '時間管理', 'フォーカス'],
  authors: [{ name: 'Pomodoro Focus Team' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Pomodoro Focus',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white antialiased dark:bg-gray-950`}
      >
        {children}
      </body>
    </html>
  );
}
