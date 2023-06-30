import React from 'react';
import MediaListGridSection from './sections/media-list-grid-section';
import { useRouter } from 'next/router';

const MediaSortView = () => {
  const router = useRouter();
  const mediaTypeQuery = router.query.media_type as string;
  const mediaSortQuery = router.query.media_sort as string ?? '';
  return (
    <div className='flex flex-col py-10 space-y-8 px-4 desktop:px-0'>
      <h1 className='capitalize'>{mediaSortQuery?.replace(/-/g, ' ')}</h1>
      <MediaListGridSection mediaSortQuery={mediaSortQuery} mediaTypeQuery={mediaTypeQuery} />
    </div>
  );
};

export default MediaSortView;
