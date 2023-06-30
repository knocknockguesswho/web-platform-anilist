import React from 'react';
import { useQuery } from '@apollo/client';
import { IMediaDetailQueryParams, IMediaDetailTagsResponse, getMediaDetailTags } from 'graphql/media-detail';
import TagListSkeleton from 'Components/templates/skeleton/tag-list-skeleton';

interface IProps {
  id: number;
}

const TagListSection = (props: IProps) => {
  const { loading, data } = useQuery<IMediaDetailTagsResponse, IMediaDetailQueryParams>(getMediaDetailTags, {
    variables: { id: props.id },
  });
  if (loading) return <TagListSkeleton />;
  return data?.media ? (
    <section id='media-detail-tag-list' className='flex flex-col space-y-4 px-4'>
      <h2 className='font-bold'>Tags</h2>
      <ul className='flex flex-col space-y-2 desktop:grid desktop:gap-4 desktop:space-y-0' style={{ gridTemplateColumns: 'repeat(auto-fit, 49%)' }}>
        {data.media.tags?.map((item) => {
          return (
            <li key={item.id} className='w-full p-4 bg-white shadow-card flex flex-col space-y-2'>
              <div className='flex flex-row items-center justify-between text-xs'>
                <span className='font-bold'>{item.name}</span>
                <span className='font-bold text-green-600'>{item.rank}&#37;</span>
              </div>
              <span className='text-sm'>{item.description}</span>
            </li>
          );
        })}
      </ul>
    </section>
  ) : <></>;
};

export default TagListSection;
