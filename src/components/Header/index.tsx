import logo from '@/assets/images/Amplify_Logo.png';
import { Bell, AlignJustify, X } from 'lucide-react';
import profile from '@/assets/images/dashboard-img.jpg';
import { Link } from 'react-router-dom';
import { useUserContext } from '@/providers/UserProvider';
import { useLocation } from 'react-router-dom';

const Header = ({ isToggle, isSidebar }: any) => {
  const location = useLocation();
  const path = location.pathname;
  const { user,randomAvatar } = useUserContext();

  return (
    <div
      className={`px-4 py-2 ${['/login'].includes(path) ? 'hidden' : 'block'}`}
    >
      <div className='flex items-center  justify-between'>
        <div className='flex items-center gap-2'>
          <span className='lg:hidden' onClick={isToggle}>
            {isSidebar ? <X size={25} /> : <AlignJustify size={25} />}
          </span>
          <Link to={'/'}>
            <div className='relative h-14 w-44 max-[300px]:h-10 max-[300px]:w-28 min-[2560px]:h-28 min-[2560px]:w-80'>
              <img src={logo} alt={'Logo'} />
            </div>
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          {/* <div>
            <Bell className='h-6 w-6 min-[2560px]:h-12 min-[2560px]:w-12' />
          </div> */}
          <div className='relative h-12 w-12 min-[2560px]:h-24 min-[2560px]:w-24'>
            <Link to={'/profile'}>
              <img
                src={user?.avatar_url || randomAvatar}
                alt={'Profile-img'}
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
