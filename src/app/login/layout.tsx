'use client';
import { Metadata } from 'next';
import * as React from 'react';
import '@/styles/globals.css';
import '@/styles/colors.css';
import '@connect2ic/core/style.css';
import { siteConfig } from '@/constant/config';
import Header from '@/components/Header';
import ConnectICProvider from '@/providers/ConnectICProvider';
import AuthWrapper from '@/components/AuthWrapper';
import { UserProvider } from '@/providers/UserProvider';

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.title,
//     template: `%s | ${siteConfig.title}`,
//   },
//   description: siteConfig.description,
//   robots: { index: true, follow: true },
//   icons: {
//     icon: '/favicon/favicon.ico',
//     shortcut: '/favicon/favicon-16x16.png',
//     apple: '/favicon/apple-touch-icon.png',
//   },
//   manifest: `/favicon/site.webmanifest`,
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ConnectICProvider>
          <AuthWrapper>
            <UserProvider>
              <Header />
              <div className='flex w-full'>{children}</div>
            </UserProvider>
          </AuthWrapper>
        </ConnectICProvider>
      </body>
    </html>
  );
}
