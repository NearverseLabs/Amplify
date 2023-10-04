'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import '@connect2ic/core/style.css';

const Dynamic = dynamic(() => import('./DynamicLoader'), {
  ssr: false,
});

const ConnectICProvider = ({ children }: { children: React.ReactNode }) => {
  return <Dynamic>{children}</Dynamic>;
};

export default ConnectICProvider;
