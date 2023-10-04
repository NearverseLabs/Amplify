'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import profile from '~/images/dashboard-img.jpg';
import { ChevronsDown, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ConnectButton = dynamic(
  () => import('@connect2ic/react').then((module) => module.ConnectButton),
  {
    ssr: false,
  }
);

const ConnectDialog = dynamic(
  () => import('@connect2ic/react').then((module) => module.ConnectDialog),
  {
    ssr: false,
  }
);

import { useBalance, useConnect } from '@connect2ic/react';
import { walletNameTrimmer } from '@/lib/utils';
import Link from 'next/link';
import { useUserContext } from '@/providers/UserProvider';

export default function HomePage() {
  const router = useRouter();
  const { isConnected, principal } = useConnect({
    onDisconnect: () => {
      localStorage.removeItem('wallet_connected');
      router.push('/login');
    },
  });

  const { isLoading, user } = useUserContext();

  if (isLoading) {
    return (
      <div className='flex h-[calc(100vh_-_73px)] w-full items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin' />
      </div>
    );
  }

  console.log({ isConnected, principal }, 'WW');
  return (
    <main>
      <div>
        <div className='mb-4 flex flex-col items-center gap-4 min-[450px]:flex-row'>
          <div className='relative h-24 w-24 min-[2560px]:h-40 min-[2560px]:w-40'>
            {user ? (
              <Image
                src={user.avatar_url}
                alt={'avatar'}
                fill={true}
                className='rounded-full'
              />
            ) : (
              <Image
                src={profile}
                alt={'profile'}
                fill={true}
                className='rounded-full'
              />
            )}
          </div>
          <div className='text-center min-[450px]:text-left'>
            <h3 className='mb-2 text-2xl font-semibold capitalize min-[2560px]:mb-6 min-[2560px]:text-5xl'>
              {`Hi, ${user ? user?.name : '-'}`}
            </h3>
            <p className='text-base font-medium min-[2560px]:text-3xl'>
              Twitter and Wallet Connections
            </p>
          </div>
        </div>
        <div className='mb-4 rounded-md border border-[#e6e6e6] bg-[#f3f3f3] p-4 min-[2560px]:mb-6 min-[2560px]:p-8'>
          <h3 className='border-b border-[#808080] pb-3 text-lg font-bold min-[2560px]:text-4xl'>
            Twitter
          </h3>
          <div className='flex items-center justify-between py-3'>
            <p className='text-lg font-semibold min-[2560px]:text-4xl'>
              {user ? user.name : '-'}
            </p>
            {/* <Link>
              <button className='text-lg font-normal underline min-[2560px]:text-4xl'>Link</button>
            </Link> */}
            {user ? (
              <p className='text-lg font-normal min-[2560px]:text-4xl'>
                Linked
              </p>
            ) : (
              <a
                className='text-lg font-normal underline min-[2560px]:text-4xl'
                href='https://amplify-backend.aticloud.atican.dev/twitter/redirect'
              >
                Link
              </a>
            )}
          </div>
        </div>
        <div className='mb-4 rounded-md border border-[#e6e6e6] bg-[#f3f3f3] p-4 min-[2560px]:mb-6 min-[2560px]:p-8'>
          <h3 className='border-b border-[#808080] pb-3 text-lg font-bold min-[2560px]:text-4xl'>
            Wallets
          </h3>
          <div className='flex items-center justify-between py-3'>
            <p className='text-lg font-semibold min-[2560px]:text-4xl'>
              {principal ? walletNameTrimmer(principal, 10, 8) : '-'}
            </p>
            {isConnected && (
              <ConnectButton>
                <div className='cursor-pointer'>{'Disconnect'}</div>
              </ConnectButton>
            )}
            <ConnectDialog />
          </div>
        </div>
        <div className='rounded-md border border-[#e6e6e6] bg-[#f3f3f3] p-4 min-[2560px]:p-8'>
          <div className='flex flex-col items-start gap-4 border-b border-[#808080] pb-3 lg:flex-row lg:items-center lg:justify-between min-[2560px]:pb-6'>
            <div className='lg:w-10/12'>
              <h3 className='text-lg font-bold min-[2560px]:text-4xl'>
                Token Balances
              </h3>
              <p className='text-sm font-normal min-[2560px]:text-2xl'>
                These tokens can be allocated as bounties for users that engage
                with your posts. These can be withdrawn to your ICP wallet at
                any time.
              </p>
            </div>
            <div className=''>
              <button className='mx-auto flex items-center gap-2 rounded bg-black px-3 py-2 text-sm text-white min-[2560px]:rounded-xl min-[2560px]:px-6 min-[2560px]:py-4 min-[2560px]:text-2xl'>
                Select Token
                <span>
                  <span className='block min-[2560px]:hidden'>
                    <ChevronsDown size={16} />
                  </span>
                  <span className='hidden min-[2560px]:block'>
                    <ChevronsDown size={40} />
                  </span>
                </span>
              </button>
            </div>
          </div>
          <div className={`w-full overflow-x-auto rounded-lg`}>
            <table className='w-full table-auto text-center'>
              <thead className='whitespace-nowrap py-3'>
                <tr>
                  <th className='px-3 py-2 min-[2560px]:py-6 min-[2560px]:text-3xl'>
                    Token Name
                  </th>
                  <th className='px-3 py-2 min-[2560px]:py-6 min-[2560px]:text-3xl'>
                    Cannister ID
                  </th>
                  <th className='px-3 py-2 min-[2560px]:py-6 min-[2560px]:text-3xl'>
                    Token Deposited
                  </th>
                  <th className='px-3 py-2 min-[2560px]:py-6 min-[2560px]:text-3xl' />
                  <th className='px-3 py-2 min-[2560px]:py-6 min-[2560px]:text-3xl' />
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((r: number) => {
                  return (
                    <tr key={r}>
                      <td className='px-3 py-2 min-[2560px]:py-6 min-[2560px]:text-3xl'>
                        $SEED
                      </td>
                      <td className='whitespace-nowrap px-3 py-2 min-[2560px]:py-6 min-[2560px]:text-3xl'>
                        goncb-kqaaa-aaaap-aakpa-cai
                      </td>
                      <td className='px-3 py-2 min-[2560px]:py-6 min-[2560px]:text-3xl'>
                        12,000
                      </td>
                      <td className='px-3 py-2 min-[2560px]:py-6 min-[2560px]:text-3xl'>
                        <div className='w-[200px]'>
                          <input
                            type='number'
                            className='w-full rounded-md border bg-white py-1  focus:ring-0'
                          />
                        </div>
                      </td>
                      <td className='px-3 py-2 min-[2560px]:py-6'>
                        <div className='flex justify-center gap-4'>
                          <button className='font-semibold text-blue-700 underline min-[2560px]:text-3xl'>
                            Deposit
                          </button>
                          <button className='font-semibold text-blue-700 underline min-[2560px]:text-3xl'>
                            Withdraw
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
