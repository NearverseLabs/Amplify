'use client';
import { Plus, Search, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Button from '@/components/buttons/Button';
import Dropdown from '@/components/Dropdown';
import profile from '~/images/dashboard-img.jpg';
import Twitter from '~/svg/twitter-x.svg';
import history from '~/images/history.png';
import NextImage from '@/components/NextImage';
import CampaignDetails from '@/components/CampaignDetails';
import WinnerList from '@/components/WinnerList';
import Link from 'next/link';

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    'In-Progress'
  );
  const [openCampaign, setOpenCampaign] = useState(false);
  const [openWinnerList, setOpenWinnerList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, []);

  if (isLoading) {
    return (
      <div className='flex h-[calc(100vh_-_73px)] w-full items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin' />
      </div>
    );
  }

  const Row = () => {
    return (
      <tr className='border-gray2 border-b text-xs'>
        <td className='p-4'>
          <div className='relative flex items-center gap-4'>
            <div className='relative h-12 w-12 min-[2560px]:h-24 min-[2560px]:w-24'>
              <Image
                src={profile}
                alt='Profile-img'
                fill={true}
                className='rounded-full'
              />
            </div>
            <p className='min-[2560px]:text-2xl'>Degens ICP</p>
          </div>
        </td>
        {['In-Progress'].includes(selectedOption as string) && (
          <td className='p-4 min-[2560px]:text-2xl'>
            Have you seen our monthly stats? With over 45 clien...
          </td>
        )}
        {['In-Progress'].includes(selectedOption as string) && (
          <>
            <td className='p-4 min-[2560px]:text-2xl'>Ends in 1hr 10m 50s</td>
          </>
        )}
        <td className='p-4 font-bold min-[2560px]:text-2xl'>12 ICP</td>

        {['In-Progress', 'Ended'].includes(selectedOption as string) && (
          <>
            <td className='p-4 font-bold min-[2560px]:text-2xl'>18 ICP</td>
          </>
        )}
        {['In-Progress'].includes(selectedOption as string) && (
          <td className='p-4'>
            <div className='bg-black1 w-fit cursor-pointer rounded-md px-4 py-2 text-xs text-white min-[2560px]:text-2xl'>
              <p>Live</p>
            </div>
          </td>
        )}
        {['Ended'].includes(selectedOption as string) && (
          <td className='p-4 font-bold min-[2560px]:text-3xl'>Raffle</td>
        )}
        {['Ended'].includes(selectedOption as string) && (
          <td className='p-4'>
            <div
              className='bg-black1 w-fit cursor-pointer rounded-md px-4 py-2 text-xs text-white min-[2560px]:text-3xl'
              onClick={() => setOpenWinnerList(true)}
            >
              <p>View Winners</p>
            </div>
          </td>
        )}

        {['In-Progress', 'Ended'].includes(selectedOption as string) && (
          <>
            <td className='p-4 text-center'>
              <div
                className='flex cursor-pointer justify-center'
                onClick={() => setOpenCampaign(true)}
              >
                <Twitter
                  alt='twitter-img'
                  className='h-6 w-6 min-[2560px]:h-16 min-[2560px]:w-16'
                />
              </div>
            </td>
          </>
        )}
        {['Claimed'].includes(selectedOption as string) && (
          <>
            <td className='p-4 text-center'>
              <div className='flex justify-center'>
                <NextImage
                  src={history}
                  alt='history-img'
                  className=''
                  width={24}
                  height={24}
                />
              </div>
            </td>
          </>
        )}
        {['Unclaimed'].includes(selectedOption as string) && (
          <td className='p-4'>
            <div className='bg-black1 w-fit cursor-pointer rounded-md px-4 py-2 text-xs text-white min-[2560px]:text-3xl'>
              <p>Claim</p>
            </div>
          </td>
        )}
      </tr>
    );
  };

  return (
    <div className='relative'>
      {openCampaign && <CampaignDetails setOpenCampaign={setOpenCampaign} />}
      {openWinnerList && <WinnerList setOpenWinnerList={setOpenWinnerList} />}
      <div className='bg-gray1 min-h-screen md:p-4'>
        <div className='flex flex-col justify-between gap-6 lg:flex-row lg:items-center'>
          {selectedOption === 'In-Progress' && (
            <div className='flex w-full max-w-sm items-center rounded-lg border border-neutral-50 px-3 min-[2560px]:max-w-xl min-[2560px]:rounded-xl min-[2560px]:px-4 min-[2560px]:py-3'>
              <input
                type='text'
                placeholder='Search..'
                className='w-full rounded-lg border-transparent bg-transparent text-xs focus:border-transparent focus:ring-0 min-[2560px]:text-4xl'
              />
              <Search className=' flex-shrink-0 text-neutral-50 min-[2560px]:h-12 min-[2560px]:w-12' />
            </div>
          )}
          {selectedOption === 'Ended' && (
            <div>
              <p className='mt-10 text-2xl font-semibold min-[2560px]:text-5xl'>
                Expired
              </p>
              <p className='text-dark-35 mt-4 text-xs min-[2560px]:text-2xl'>
                These Engage-To-Earn campaigns have ended
              </p>
            </div>
          )}
          {selectedOption === 'Claimed' && (
            <div>
              <p className='mt-10 text-2xl font-semibold min-[2560px]:text-5xl'>
                Claimed
              </p>
              <p className='text-dark-35 mt-4 text-xs min-[2560px]:text-2xl'>
                You have claimed these rewards!
              </p>
            </div>
          )}
          {selectedOption === 'Unclaimed' && (
            <div>
              <p className='mt-10 text-2xl font-semibold min-[2560px]:text-5xl'>
                Unclaimed
              </p>
              <p className='text-dark-35 mt-4 text-xs min-[2560px]:text-2xl'>
                These are rewards yet to be claimed by you
              </p>
            </div>
          )}

          <div className='flex flex-col gap-2 gap-y-4 min-[500px]:flex-row min-[500px]:items-center min-[2560px]:gap-6'>
            <Dropdown
              className='min-w-[200px]'
              dropdownList={['In-Progress', 'Ended', 'Claimed', 'Unclaimed']}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            <Link href={'/create-campaign'}>
              <Button
                size='sm'
                variant='dark'
                leftIcon={Plus}
                classNames={{ leftIcon: 'min-[2560px]:w-12 min-[2560px]:h-12' }}
                className='rounded-lg px-5 py-3 font-bold min-[2560px]:rounded-xl min-[2560px]:px-10 min-[2560px]:py-6 min-[2560px]:text-4xl'
              >
                <span className='truncate'>Create New Campaigns</span>
              </Button>
            </Link>
          </div>
        </div>
        {selectedOption === 'In-Progress' && (
          <>
            <p className='mt-10 text-2xl font-semibold min-[2560px]:text-5xl'>
              Live Campaigns
            </p>
            <p className='text-dark-35 mt-4 text-xs min-[2560px]:text-2xl'>
              The list of Tweets that are offering rewards
            </p>
          </>
        )}
        <div
          className={`border-gray2 mt-8 overflow-x-auto rounded-lg border ${
            ['Claimed', 'Unclaimed'].includes(selectedOption as string)
              ? 'w-full lg:w-3/5 xl:w-2/5'
              : 'w-full'
          }`}
        >
          <table className={`bg-white1 w-full table-auto`}>
            <thead className='border-gray2 text-gray3 whitespace-nowrap border-b text-left text-sm'>
              <tr>
                <th className='p-4 py-6 min-[2560px]:text-3xl'>Project/User</th>
                {['In-Progress'].includes(selectedOption as string) && (
                  <>
                    <th className='min-w-[10rem] p-4 py-6 min-[2560px]:text-3xl'>
                      Tweet
                    </th>
                  </>
                )}
                {['In-Progress'].includes(selectedOption as string) && (
                  <>
                    <th className='p-4 py-6 min-[2560px]:text-3xl'>Ends In</th>
                  </>
                )}
                <th className='p-4 py-6 min-[2560px]:text-3xl'>Reward</th>
                {['In-Progress', 'Ended'].includes(
                  selectedOption as string
                ) && (
                  <>
                    <th className='p-4 py-6 min-[2560px]:text-3xl'>
                      Total Rewards
                    </th>
                  </>
                )}
                {['Ended'].includes(selectedOption as string) && (
                  <>
                    <th className='p-4 py-6 min-[2560px]:text-3xl'>
                      Claim Type
                    </th>
                  </>
                )}
                {selectedOption === 'In-Progress' && (
                  <>
                    <th className='p-4 py-6 min-[2560px]:text-3xl'>Status</th>
                    <th className='p-4 py-6 text-center min-[2560px]:text-3xl'>
                      Engage Link
                    </th>
                  </>
                )}
                {selectedOption === 'Ended' && (
                  <>
                    <th className='p-4 py-6 min-[2560px]:text-3xl'>Winners</th>
                    <th className='p-4 py-6 text-center min-[2560px]:text-3xl'>
                      Your Result
                    </th>
                  </>
                )}
                {selectedOption === 'Claimed' && (
                  <>
                    <th className='p-4 py-6 text-center min-[2560px]:text-3xl'>
                      Transactions
                    </th>
                  </>
                )}
                {selectedOption === 'Unclaimed' && (
                  <>
                    <th className='p-4 py-6 text-left min-[2560px]:text-3xl'>
                      Actions
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_a, i) => (
                <Row key={i} />
              ))}
            </tbody>
          </table>
        </div>

        <div
          className={`mt-4 flex flex-col justify-between lg:flex-row ${
            ['Claimed', 'Unclaimed'].includes(selectedOption as string)
              ? 'lg:mt-4'
              : 'lg:mt-0'
          } gap-6 min-[2560px]:mt-6`}
        >
          {['Ended'].includes(selectedOption as string) && (
            <>
              <div className='order-2 flex items-center gap-4 lg:order-none'>
                <Twitter
                  alt='twitter-img'
                  className='h-6 w-6 fill-[#01C29A] stroke-[#01C29A] min-[2560px]:h-16 min-[2560px]:w-16'
                />
                <p className='text-black1 text-xs min-[2560px]:text-2xl'>
                  You won this campaign
                </p>
              </div>
              <div className='order-3 flex items-center gap-4 lg:order-none'>
                <Twitter
                  alt='twitter-img'
                  className='h-6 w-6 fill-[#FF4D5E] stroke-[#FF4D5E] min-[2560px]:h-16 min-[2560px]:w-16'
                />
                <p className='text-black1 text-xs min-[2560px]:text-2xl'>
                  You lost this campaign
                </p>
              </div>
              <div className='order-4 flex items-center gap-4 lg:order-none'>
                <Twitter
                  alt='twitter-img'
                  className='h-6 w-6 fill-[#808080] stroke-[#808080] min-[2560px]:h-16 min-[2560px]:w-16'
                />
                <p className='text-black1 text-xs min-[2560px]:text-2xl'>
                  You haven’t participated yet
                </p>
              </div>
            </>
          )}
          {['In-Progress'].includes(selectedOption as string) && (
            <>
              <div className='order-2 flex items-center gap-4 lg:order-none'>
                <Twitter
                  alt='twitter-img'
                  className='h-6 w-6 min-[2560px]:h-16 min-[2560px]:w-16'
                />
                <p className='text-black1 text-xs min-[2560px]:text-2xl'>
                  You haven’t participated yet
                </p>
              </div>
              <div className='order-3 flex items-center gap-4 lg:order-none'>
                <Twitter
                  alt='twitter-img'
                  className='fill-gray2 h-6 w-6 min-[2560px]:h-16 min-[2560px]:w-16'
                />
                <p className='text-black1 text-xs min-[2560px]:text-2xl'>
                  You have already entered
                </p>
              </div>
            </>
          )}
          {/* Pagination */}
          <div className='shadow-box-s order-1 flex w-fit items-center gap-4 rounded-md p-3 text-sm font-semibold md:gap-6 md:px-6 lg:order-none min-[2560px]:text-3xl'>
            <p>
              <ChevronLeft className='h-4 w-4 min-[2560px]:h-10 min-[2560px]:w-10' />
            </p>
            <div className='flex items-center justify-center rounded-md bg-black p-1 px-3 text-white min-[2560px]:p-6'>
              1
            </div>
            <div>2</div>
            <div>3</div>
            <div>...</div>
            <div>10</div>
            <p>
              <ChevronRight className='h-4 w-4 min-[2560px]:h-10 min-[2560px]:w-10' />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
