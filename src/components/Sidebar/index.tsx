'use client';
import { HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import User from '~/svg/user-octagon.svg';
import Dashboard from '~/svg/category.svg';
import LogOut from '~/svg/log-out.svg';
import element1 from '~/images/bg1.png';
import element2 from '~/images/bg2.png';
import { useBalance, useConnect, useWallet } from '@connect2ic/react';

const Sidebar = ({ close }: any) => {
  const path = usePathname();
  const { disconnect, isConnected, principal, activeProvider } = useConnect();
  const [wallet] = useWallet();
  const [assets, { refetch, error }] = useBalance();

  console.log('activeProvider', principal, assets);
  const router = useRouter();
  const MenuList = [
    {
      name: 'dashboard',
      icon: <Dashboard className='stroke-[#808080]' />,
      selectedIcon: <Dashboard className='stroke-black' />,
      link: '/',
    },
    {
      name: 'profile',
      icon: <User className='stroke-[#808080]' />,
      selectedIcon: <User className='stroke-black' />,
      link: '/profile',
    },
  ];

  const handleLogout = () => {
    disconnect();
    localStorage.removeItem('wallet_connected');
    router.push('/login');
  };

  return (
    <div className='flex h-full w-full flex-col justify-between px-8 py-4'>
      <div>
        {MenuList.map((m: any) => {
          return (
            <Link key={m.name} href={m.link} onClick={close}>
              <div
                className={`my-3.5 flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold min-[2560px]:py-4 min-[2560px]:text-4xl ${
                  path === m.link ? 'bg-[#f3f3f3] text-black' : 'text-[#808080]'
                }`}
              >
                {/* <m.icon height={22} width={22} className={`${path === m.link ? "stroke-black":"stroke-[#808080]"}`}/> */}
                {/* <m.icon height={22} width={22} className={`stroke-red-400`} /> */}
                <div className='h-6 w-6 min-[2560px]:h-12 min-[2560px]:w-12'>
                  {path === m.link ? m.selectedIcon : m.icon}
                </div>
                <p className='capitalize'>{m.name}</p>
              </div>
            </Link>
          );
        })}
        <div
          onClick={handleLogout}
          className={`} my-3.5 flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-[#808080] min-[2560px]:py-4 min-[2560px]:text-4xl`}
        >
          <div className='h-6 w-6 min-[2560px]:h-12 min-[2560px]:w-12'>
            <LogOut />
          </div>
          <p className='capitalize'>{'Logout'}</p>
        </div>
      </div>
      <div>
        <div className='relative rounded-lg bg-black px-2 py-3 text-center text-white min-[2560px]:rounded-xl min-[2560px]:px-6 min-[2560px]:py-8'>
          <Image src={element1} alt='ele-1' className='absolute left-0 top-0' />
          <Image
            src={element2}
            alt='ele-2'
            className='absolute bottom-0 right-0'
          />
          <div className='mx-auto -mt-8 mb-8 w-fit rounded-full bg-black text-center shadow-[0_0_10px_rgba(0,0,0,0.5)] min-[2560px]:-mt-20 min-[2560px]:mb-20'>
            <span className='block min-[2560px]:hidden'>
              <HelpCircle size={50} />
            </span>
            <span className='hidden min-[2560px]:block'>
              <HelpCircle size={100} />
            </span>
          </div>
          <h3 className='mb-2 text-lg font-semibold min-[2560px]:text-4xl'>
            Suggestions
          </h3>
          <p className='mb-8 text-sm font-medium min-[2560px]:text-2xl'>
            Having Trouble in Learning. Please contact us for more questions.
          </p>
          <button className='rounded-md bg-white px-3 py-2 text-xs font-semibold text-black min-[2560px]:text-2xl'>
            Create Ticket on Discord
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
