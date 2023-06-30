import CardMedia from 'Components/organisms/card-media';
import React from 'react';

const MediaListGridSekeleton = () => {
  return (
    <ul className='grid grid-flow-row gap-6 grid-cols-2 tablet:grid-cols-3 small-desktop:grid-cols-4 desktop:grid-cols-5'>
      {Array.from({ length: 10 }).map((_, idx) => {
        return (
          <li key={idx}>
            <CardMedia isLoading={true} />
          </li>
        );
      })}
    </ul>
  );
};

export default MediaListGridSekeleton;
