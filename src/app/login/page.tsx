'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import Logo from '~/images/Amplify_Logo.png';
import { Loader2 } from 'lucide-react';
import {
  ConnectButton,
  ConnectDialog,
  useConnect,
  useProviders,
} from '@connect2ic/react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, []);

  if (isLoading) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin' />
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='flex w-full flex-wrap p-6 md:h-screen'>
        <div className='flex h-full w-full max-w-md flex-col justify-between gap-10 rounded-3xl bg-black p-8 md:w-2/5 lg:w-1/4'>
          <div className='md:mt-16'>
            <h2 className='mb-6 text-4xl font-bold text-white'>
              Speak to the <br className='hidden md:block' /> right audience{' '}
            </h2>
            <p className='text-light-gray text-base'>
              Targeted engagement for creators on ICP{' '}
              <br className='hidden md:block' /> and rewards for users
            </p>
          </div>
          <p className='text-light-gray text-sm'>
            Powered by Nearverse Labs Pvt Ltd
          </p>
        </div>
        <div className='flex w-full flex-col items-center justify-center pt-8 md:w-3/5 md:pt-0 lg:w-3/4'>
          <Image src={Logo} alt='logo' />
          <ConnectButton
            onConnect={() => {
              localStorage.setItem('wallet_connected', 'true');
              router.push('/');
            }}
          >
            {/* <ConnectButton> */}
            <div className='border-black1 bg-light-gray shadow-btn-shadow cursor-pointer rounded-lg border-2 px-16 py-2.5 font-medium outline-0'>
              Login with ICP
            </div>
          </ConnectButton>
          <ConnectDialog />
        </div>
      </div>
    </div>
  );
};

export default Login;
