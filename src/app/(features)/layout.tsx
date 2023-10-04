'use client';
import * as React from 'react';

import '@/styles/globals.css';
import '@/styles/colors.css';
import '@connect2ic/core/style.css';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useState } from 'react';
import ConnectICProvider from '@/providers/ConnectICProvider';
import AuthWrapper from '@/components/AuthWrapper';
import { UserProvider } from '@/providers/UserProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <html>
      <head>
        <title>Amplify</title>
      </head>
      <body className='relative'>
        <ConnectICProvider>
          <AuthWrapper>
            <UserProvider>
              <Header isToggle={() => setIsOpen(!isOpen)} isSidebar={isOpen} />
              <div className='flex h-[calc(100vh_-_73px)] min-[2560px]:h-[calc(100vh_-_128px)]'>
                <div
                  className={`${
                    isOpen
                      ? 'fixed bottom-0 z-10 block h-[calc(100vh_-_72px)] w-full bg-white'
                      : 'hidden'
                  } lg:block lg:h-full lg:w-1/4 xl:w-1/5`}
                >
                  <Sidebar close={() => setIsOpen(false)} />
                </div>
                <div className='h-full w-full overflow-y-auto p-4 lg:w-3/4 xl:w-4/5'>
                  {children}
                </div>
              </div>
            </UserProvider>
          </AuthWrapper>
        </ConnectICProvider>
      </body>
    </html>
  );
}
