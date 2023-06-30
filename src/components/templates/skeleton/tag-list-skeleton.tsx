import React from 'react';

const TagListSkeleton = () => {
  return (
    <div className='w-full flex flex-col space-y-4 px-4'>
      <div className='h-4 w-40 skeleton' />
      <div className='w-full flex flex-col space-y-2 desktop:grid desktop:gap-4 desktop:space-y-0' style={{ gridTemplateColumns: 'repeat(auto-fit, 49%)' }}>
        {Array.from({ length: 10 }).map((_, idx) => {
          return (
            <div key={idx} className='bg-white shadow-card w-full flex flex-col space-y-4 p-4'>
              <div className='flex flex-row items-center justify-between'>
                <div className='h-2 w-20 skeleton' />
                <div className='h-2 w-4 skeleton' />
              </div>
              <div className='h-2 w-full skeleton' />
              <div className='h-2 w-40 skeleton' />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagListSkeleton;
