'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthWrapper({ children }: any) {
  const router = useRouter();
  // const { isConnected } = useConnect()
  const isConnected = localStorage.getItem('wallet_connected') === 'true';

  useEffect(() => {
    if (!isConnected) {
      router.push('/login');
    }
  }, [localStorage]);

  return children;
}
