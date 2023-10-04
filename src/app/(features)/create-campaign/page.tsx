'use client';
import Button from '@/components/buttons/Button';
import { ChevronLeft, ChevronDown, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CreateCampaignPage = () => {
  const [selected, setSelected] = useState<string>('Select Token');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [requirements, setRequirements] = useState<any>([]);
  const router = useRouter();
  const requirementList = [
    'Follow',
    'Like',
    'Retweet',
    'Quote Retweet',
    'Minimum Follower Count',
  ];

  const removeElement = (item: string) => {
    const filtered = requirements.filter((r: string) => r !== item);
    setRequirements(filtered);
  };

  // min-[2560px]:

  return (
    <div className='bg-[#fafafa] p-2'>
      <div
        onClick={() => router.back()}
        className='mb-4 flex cursor-pointer items-center gap-1 text-base font-bold text-[#b3b3b3]'
      >
        <span className='block min-[2560px]:hidden'>
          <ChevronLeft />
        </span>
        <span className='hidden min-[2560px]:block'>
          <ChevronLeft size={50} />
        </span>
        <div className='min-[2560px]:text-4xl'>Go Back</div>
      </div>
      <div className='flex flex-wrap items-center justify-between border-b border-[#808080] pb-6'>
        <div className='w-full md:w-10/12'>
          <h3 className='mb-2 text-2xl font-semibold min-[2560px]:mb-6 min-[2560px]:text-5xl'>
            Create New Campaign
          </h3>
          <p className='text-sm font-normal text-[#595959] min-[2560px]:text-2xl'>
            Fill the form to start a new campaign
          </p>
        </div>
      </div>
      <div className='py-8'>
        <div className='mb-6 items-center gap-4 md:flex min-[2560px]:mb-10'>
          <div className='w-full md:w-1/5'>
            <h3 className='mb-2 text-base font-semibold min-[2560px]:text-4xl'>
              Project/Username*
            </h3>
            <p className='text-sm font-normal text-[#595959] min-[2560px]:text-2xl'>
              Your Twitter Username
            </p>
          </div>
          <div className='w-full md:w-2/5'>
            <input
              placeholder='Tribes of ICP'
              type='text'
              className='w-full rounded border border-[#b3b3b3] min-[2560px]:rounded-xl min-[2560px]:py-4 min-[2560px]:text-4xl'
            />
          </div>
        </div>
        <div className='mb-6 items-center gap-4 md:flex min-[2560px]:mb-10'>
          <div className='w-full md:w-1/5'>
            <h3 className='mb-2 text-base font-semibold min-[2560px]:text-4xl'>
              Tweet Link/Tweet ID*
            </h3>
            <p className='text-sm font-normal text-[#595959] min-[2560px]:text-2xl'>
              Paste the whole link or just the ID
            </p>
          </div>
          <div className='w-full md:w-2/5'>
            <input
              placeholder='https://twitter.com/solhellboi/status/1668881618050711552?s=20'
              className='w-full rounded border border-[#b3b3b3] min-[2560px]:rounded-xl min-[2560px]:py-4 min-[2560px]:text-4xl'
            />
          </div>
        </div>
        <div className='mb-6 items-center gap-4 md:flex min-[2560px]:mb-10'>
          <div className='w-full md:w-1/5'>
            <h3 className='mb-2 text-base font-semibold min-[2560px]:text-4xl'>
              Requirements *
            </h3>
            <p className='text-sm font-normal text-[#595959] min-[2560px]:text-2xl'>
              Participation requirements for this campaign
            </p>
          </div>
          <div className='w-full md:w-2/5'>
            <div className='relative'>
              <div className='flex w-full items-center justify-between rounded border border-[#b3b3b3] px-3 py-2 min-[2560px]:rounded-xl min-[2560px]:py-6'>
                <div className='flex flex-wrap gap-2 min-[2560px]:text-4xl'>
                  {requirements.length === 0 && 'Select Requirements'}
                  {requirements &&
                    requirements.map((r: string) => {
                      return (
                        <div
                          key={r}
                          className='flex items-center gap-1 rounded bg-[#f3f3f3] px-2 py-1 text-sm min-[2560px]:rounded-xl min-[2560px]:p-3 min-[2560px]:text-4xl'
                          onClick={() => removeElement(r)}
                        >
                          {r}
                          <div>
                            <span className='block min-[2560px]:hidden'>
                              <X className='cursor-pointer' size={16} />
                            </span>
                            <span className='hidden min-[2560px]:block'>
                              <X className='cursor-pointer' size={35} />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div>
                  <span className='block min-[2560px]:hidden'>
                    <ChevronDown
                      className='cursor-pointer'
                      onClick={() => setShow(!show)}
                      size={18}
                    />
                  </span>
                  <span className='hidden min-[2560px]:block'>
                    <ChevronDown
                      className='cursor-pointer'
                      onClick={() => setShow(!show)}
                      size={50}
                    />
                  </span>
                </div>
              </div>
              <div
                className={`${
                  show ? 'block' : 'hidden'
                } absolute top-12 z-10 w-full rounded bg-white shadow-[0_0_10px_rgba(0,0,0,0.25)] min-[2560px]:top-28`}
              >
                {requirementList.map((t: string) => {
                  return (
                    <button
                      key={t}
                      className={`block w-full px-4 py-2 text-left hover:bg-[#f3f3f3] min-[2560px]:p-6 min-[2560px]:text-4xl`}
                      onClick={() => {
                        setRequirements([...requirements, t]);
                        setShow(false);
                      }}
                      disabled={requirements.includes(t)}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className='mb-6 items-center gap-4 md:flex min-[2560px]:mb-10'>
          <div className='w-full md:w-1/5'>
            <h3 className='mb-2 text-base font-semibold min-[2560px]:text-4xl'>
              Reward*
            </h3>
            <p className='text-sm font-normal text-[#595959] min-[2560px]:text-2xl'>
              Amount and Token Type
            </p>
          </div>
          <div className='flex w-full gap-4 max-[300px]:flex-wrap md:w-2/5'>
            <div className='w-1/2 max-[300px]:w-full'>
              <p className='mb-2 min-[2560px]:text-4xl'>Amount</p>
              <input
                placeholder='5'
                type='number'
                className='w-full rounded border border-[#b3b3b3] min-[2560px]:rounded-xl min-[2560px]:py-4 min-[2560px]:text-4xl'
              />
            </div>
            <div className='w-1/2 max-[300px]:w-full'>
              <p className='mb-2 min-[2560px]:text-4xl'>Token</p>
              <div className='relative'>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className='flex w-full items-center justify-between rounded border border-[#b3b3b3] px-3 py-2 min-[2560px]:rounded-xl min-[2560px]:py-4 min-[2560px]:text-4xl'
                >
                  <span>{selected}</span>
                  <span className='block min-[2560px]:hidden'>
                    <ChevronDown size={18} />
                  </span>
                  <span className='hidden min-[2560px]:block'>
                    <ChevronDown size={50} />
                  </span>
                </button>
                <div
                  className={`${
                    isOpen ? 'block' : 'hidden'
                  } absolute top-12 w-full rounded bg-white shadow-[0_0_10px_rgba(0,0,0,0.25)] min-[2560px]:top-24`}
                >
                  {['ICP', 'SEED', 'NAUT'].map((t: string) => {
                    return (
                      <div
                        key={t}
                        className='cursor-pointer px-4 py-2 hover:bg-[#f3f3f3] min-[2560px]:p-6 min-[2560px]:text-4xl'
                        onClick={() => {
                          setSelected(t);
                          setIsOpen(false);
                        }}
                      >
                        {t}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mb-6 items-center gap-4 md:flex min-[2560px]:mb-10'>
          <div className='w-full md:w-1/5'>
            <h3 className='mb-2 text-base font-semibold min-[2560px]:text-4xl'>
              Winners
            </h3>
            <p className='text-sm font-normal text-[#595959] min-[2560px]:text-2xl'>
              No of Winners
            </p>
          </div>
          <div className='w-full md:w-2/5'>
            <input
              placeholder='5'
              type='number'
              className='w-full rounded border border-[#b3b3b3] min-[2560px]:rounded-xl min-[2560px]:py-4 min-[2560px]:text-4xl'
            />
          </div>
        </div>
        <div className='mb-6 items-center gap-4 md:flex min-[2560px]:mb-10'>
          <div className='w-full md:w-1/5'>
            <h3 className='mb-2 text-base font-semibold min-[2560px]:text-4xl'>
              Total Rewards*
            </h3>
            <p className='text-sm font-normal text-[#595959] min-[2560px]:text-2xl'>
              Total = Reward x No of Winners
            </p>
          </div>
          <div className='w-full md:w-2/5'>
            <input
              type='text'
              placeholder='30 ICP'
              className='w-full rounded border border-[#b3b3b3] min-[2560px]:rounded-xl min-[2560px]:py-4 min-[2560px]:text-4xl'
            />
          </div>
        </div>
        <div className='mb-4 items-center gap-4 md:flex min-[2560px]:mb-10'>
          <div className='w-full md:w-1/5'>
            <h3 className='mb-2 text-base font-semibold min-[2560px]:text-4xl'>
              Duration*
            </h3>
            <p className='text-sm font-normal text-[#595959] min-[2560px]:text-2xl'>
              Campaign duration in HH:MM
            </p>
          </div>
          <div className='w-full md:w-2/5'>
            <input
              placeholder='24:00:00'
              type='time'
              className='w-full rounded border border-[#b3b3b3] min-[2560px]:rounded-xl min-[2560px]:py-4 min-[2560px]:text-4xl'
            />
          </div>
        </div>

        <div>
          <Button
            variant='dark'
            className='mt-6 gap-2 rounded bg-black px-3 py-2 text-sm text-white min-[2560px]:rounded-xl min-[2560px]:p-8 min-[2560px]:text-4xl'
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignPage;
