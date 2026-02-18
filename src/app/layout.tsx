import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Threads投稿シミュレーター",
  description: "複数画像のThreads投稿プレビューを確認できるツール。1-5枚の画像をアップロードして、Threadsでの表示を事前にチェック。",
  keywords: ["Threads", "Instagram", "投稿", "シミュレーター", "プレビュー", "画像"],
  authors: [{ name: "nobphotographr" }],
  openGraph: {
    title: "Threads投稿シミュレーター",
    description: "複数画像のThreads投稿プレビューを確認できるツール",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Threads投稿シミュレーター",
    description: "複数画像のThreads投稿プレビューを確認できるツール",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
