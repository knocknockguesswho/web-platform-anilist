import CardMedia from 'Components/organisms/card-media';
import React from 'react';

const MediaListSkeleton = () => {
  return (
    <div className='space-y-6 py-2'>
      <div className='h-4 w-40 skeleton mx-4' />
      <ul className='flex flex-row space-x-4 overflow-x-hidden pl-4'>
        {Array.from({ length: 5 }).map((_, idx) => {
          return (
            <li key={idx}>
              <CardMedia isLoading={true} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MediaListSkeleton;
