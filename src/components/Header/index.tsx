'use client';
import Image from 'next/image';
import logo from '../../../public/images/Amplify_Logo.png';
import { Bell, AlignJustify, X } from 'lucide-react';
import profile from '../../../public/images/dashboard-img.jpg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserContext } from '@/providers/UserProvider';

const Header = ({ isToggle, isSidebar }: any) => {
  const path = usePathname();
  const { user } = useUserContext();

  return (
    <div
      className={`px-4 py-2 ${['/login'].includes(path) ? 'hidden' : 'block'}`}
    >
      <div className='flex items-center  justify-between'>
        <div className='flex items-center gap-2'>
          <span className='lg:hidden' onClick={isToggle}>
            {isSidebar ? <X size={25} /> : <AlignJustify size={25} />}
          </span>
          <Link href={'/'}>
            <div className='relative h-14 w-44 max-[300px]:h-10 max-[300px]:w-28 min-[2560px]:h-28 min-[2560px]:w-80'>
              <Image src={logo} alt={'Logo'} fill={true} />
            </div>
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          <div>
            <Bell className='h-6 w-6 min-[2560px]:h-12 min-[2560px]:w-12' />
          </div>
          <div className='relative h-12 w-12 min-[2560px]:h-24 min-[2560px]:w-24'>
            <Link href={'/profile'}>
              <Image
                src={user?.avatar_url || profile}
                alt={'Profile-img'}
                fill={true}
                className='rounded-full'
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
