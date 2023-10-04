'use client';
import React from 'react';
import { createClient } from '@connect2ic/core';
import {
  InfinityWallet,
  PlugWallet,
  AstroX,
  InternetIdentity,
  NFID,
  // StoicWallet,
  ICX,
} from '@connect2ic/core/providers';
import { Connect2ICProvider } from '@connect2ic/react';
import ClientOnly from '@/components/ClientOnly';

const client = createClient({
  providers: [
    new InfinityWallet(),
    // new PlugWallet(),
    // new AstroX(),
    new InternetIdentity(),
    new NFID(),
    // new StoicWallet(),
    // new ICX()
  ],
});

const ConnectICProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientOnly>
      <Connect2ICProvider client={client}>{children}</Connect2ICProvider>
    </ClientOnly>
  );
};

export default ConnectICProvider;
