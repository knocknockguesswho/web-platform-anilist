import React from 'react';
import TrendingSection from './sections/trending-section';
import PopularSection from './sections/popular-section';
import BestScoreSection from './sections/best-score-section';
import Dropdown, { IDropdownOption } from 'Components/molecules/dropdown';
import { MEDIA_TYPE, typeNameMap } from 'Helpers/interfaces/anilist-media';
import { useRouter } from 'next/router';
const MediaTypeView = () => {
  const router = useRouter();
  const mediaOptions = Object.entries(typeNameMap).map(([k, v]) => ({ id: v, label: k }));
  const mediaTypeQuery = router.query.media_type as string ?? mediaOptions[0].id;

  const selectedMediaType: IDropdownOption | undefined = React.useMemo(() => {
    return mediaOptions.find((item) => item.id as string === mediaTypeQuery);
  }, [mediaOptions, mediaTypeQuery]);
  return (
    <div className='flex flex-col py-10 space-y-8'>
      <div className='px-4 flex flex-row space-x-2 items-center desktop:px-0'>
        <span className='font-semibold'>Media Type</span>
        <div className='w-40'>
          <Dropdown
            options={mediaOptions}
            placeholder='Media Type'
            selected={mediaOptions.find((item) => item.id === mediaTypeQuery)}
            onSelect={(selected) => router.replace(`/${selected.id}`)}
          />
        </div>
      </div>
      {selectedMediaType &&
        <div className='space-y-6'>
          <TrendingSection selectedMediaType={selectedMediaType.label as MEDIA_TYPE} />
          <PopularSection selectedMediaType={selectedMediaType.label as MEDIA_TYPE} />
          <BestScoreSection selectedMediaType={selectedMediaType.label as MEDIA_TYPE} withDivider={false} />
        </div>
      }
    </div>
  );
};

export default MediaTypeView;
