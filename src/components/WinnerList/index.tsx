import { ChevronLeft, ChevronRight, Copy, X } from 'lucide-react';
import React from 'react';

const WinnerList = ({ setOpenWinnerList }: any) => {
  return (
    <div className='fixed bottom-0 right-0 z-40 h-[calc(100vh_-_5.3rem)] w-full overflow-y-auto rounded-sm bg-white p-4 shadow-md max-[300px]:right-1 max-[300px]:w-[260px] sm:w-[380px]'>
      <div className='h-full w-full'>
        <X
          size={26}
          className='absolute right-8 top-4 cursor-pointer'
          onClick={() => setOpenWinnerList(false)}
        />
        <div className='flex items-center gap-4'>
          <p className='text-2xl font-semibold'>Winners</p>
          <Copy className='cursor-pointer text-gray-400' />
        </div>
        <div className='my-4 border-t' />
        <div>
          <div>
            {Array.from({ length: 5 }).map((_a, i) => (
              <div key={i} className='mb-2 text-sm'>
                {`Twitter Username Winner 0 ${i + 1}`}
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className='shadow-box-s absolute bottom-4 left-1/2 ml-auto flex w-fit -translate-x-1/2 items-center justify-center gap-4 rounded-md p-3 text-sm font-semibold md:gap-6 md:px-6'>
            <p>
              <ChevronLeft className='h-4 w-4 min-[2560px]:h-10 min-[2560px]:w-10' />
            </p>
            <div className='flex items-center justify-center rounded-md bg-black p-1 px-3 text-white'>
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

export default WinnerList;
