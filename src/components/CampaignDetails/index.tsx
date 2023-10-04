import Button from '@/components/buttons/Button';
import { Check, X } from 'lucide-react';
import Image from 'next/image';
import CampaignImg from '~/images/campaign.png';
import Twitter from '~/svg/twitter-x.svg';

const CheckUncheckIcon = ({ type }: { type: 'check' | 'uncheck' }) => {
  if (type === 'check') {
    return (
      <div className='flex w-fit items-center justify-center rounded-full bg-green-400 p-1 text-white'>
        <Check size={14} />
      </div>
    );
  }

  return (
    <div className='flex w-fit items-center justify-center rounded-full bg-red-600 p-1 text-white'>
      <X size={14} />
    </div>
  );
};

const CampaignDetails = ({ setOpenCampaign }: any) => {
  return (
    <div className='md:top-15 fixed bottom-0 z-40 h-[calc(100vh_-_4.5rem)] overflow-y-auto rounded-sm bg-white p-4 shadow-[0_0_10px_rgba(0,0,0,0.2)] sm:right-[0.5rem] sm:max-w-sm'>
      <div className='h-full w-full'>
        <X
          size={18}
          className='absolute right-6 top-4 cursor-pointer'
          onClick={() => setOpenCampaign(false)}
        />
        <p className='mb-2 text-xl font-bold'>ICP DEGENS</p>
        <p className='text-xl font-normal'>Campaign Details</p>
        <div className='my-4 w-full border-t py-4'>
          <Image src={CampaignImg} alt='campaign' className='w-full' />
        </div>
        <p className='text-xs'>
          Please ensure you do the tasks below before clicking on Verify &
          Enter:
        </p>

        <div className='my-3 flex items-center justify-between text-sm'>
          <p className='underline'>{'1) Like'}</p>
          <CheckUncheckIcon type='check' />
        </div>
        <div className='my-3 flex items-center justify-between text-sm'>
          <p className='underline'>{'2) Follow'}</p>
          <CheckUncheckIcon type='check' />
        </div>
        <div className='my-3 flex items-center justify-between text-sm'>
          <p className='underline'>{'3) Repost'}</p>
          <CheckUncheckIcon type='uncheck' />
        </div>
        <div className='my-3 flex items-center justify-between text-sm'>
          <p className='underline'>{'4) Comment'}</p>
          <CheckUncheckIcon type='check' />
        </div>
        <div className='mt-5 flex items-center justify-between gap-4'>
          <Button variant='dark'>
            Goto Tweet
            <span className='ml-1'>
              <Twitter className='fill-gray2' height={20} width={20} />
            </span>
          </Button>
          <Button variant='dark'>Verify & Enter</Button>
        </div>
        <div className='h-4' />
      </div>
    </div>
  );
};

export default CampaignDetails;
