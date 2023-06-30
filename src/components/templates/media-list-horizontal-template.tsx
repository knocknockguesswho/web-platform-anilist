import React from 'react';
import Scrollview from 'Components/atoms/scrollview';
import Link from 'next/link';
import MediaListSkeleton from './skeleton/media-list-sekeleton';
import CardMedia from 'Components/organisms/card-media';
import { ApolloError } from '@apollo/client';
import Divider from 'Components/atoms/divider';
import { IAnilistMedia } from 'Helpers/interfaces/anilist-media';

interface IProps {
  title: string;
  loading?: boolean;
  error?: ApolloError;
  data?: Array<IAnilistMedia>;
  viewAllHref?: string;
  withDivider?: boolean;
}

const MediaListHorizontalTemplate = (props: IProps) => {
  if (props.loading) return <MediaListSkeleton />;
  return !props.error || (props.data && props.data.length > 0) ? (
    <div className='space-y-6'>
      <div id='media-list' className='space-y-4'>
        <div className='flex flex-row items-center justify-between px-4 desktop:px-0'>
          <h2>{props.title}</h2>
          {props.viewAllHref && <Link href={props.viewAllHref} className='font-bold text-blue'>View Full List</Link>}
        </div>
        <Scrollview className='px-4 desktop:px-0 space-x-4 small-desktop:pt-4'>
          {props.data?.map((item, idx) => {
            return (
              <Link
                key={item.id}
                href={{
                  pathname: '/[media_type]/detail/[id]',
                  query: {
                    media_type: item.type?.toLowerCase(),
                    id: item.id,
                  },
                }}
                className='last:pr-4 desktop:last:pr-0'>
                <CardMedia item={item} isPrioritized={idx < 3} />
              </Link>
            );
          })}
        </Scrollview>
      </div>
      {props.withDivider && <Divider />}
    </div>
  ) : <></>;
};

MediaListHorizontalTemplate.defaultProps = {
  withDivider: true,
};

export default MediaListHorizontalTemplate;
