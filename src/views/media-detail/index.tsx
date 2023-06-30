import React from 'react';
import Error from 'Pages/_error';
import { useRouter } from 'next/router';
import { IMediaDetailQueryParams, IMediaDetailResponse, getMediaDetail } from 'graphql/media-detail';
import { useQuery } from '@apollo/client';
import BannerSection from './sections/banner-section';
import DescriptionSection from './sections/description-section';
import AttributesSection from './sections/attributes-section';
import IntersectionObserverContainer from 'Components/atoms/intersection-observer-container';
import MediaListSkeleton from 'Components/templates/skeleton/media-list-sekeleton';
import dynamic from 'next/dynamic';
import TagListSkeleton from 'Components/templates/skeleton/tag-list-skeleton';
const RelationSection = dynamic(() => import('./sections/relation-section'), { loading: () => <MediaListSkeleton /> });
const TagListSection = dynamic(() => import('./sections/tag-list-section'), { loading: () => <TagListSkeleton /> });

const MediaDetailView = () => {
  const router = useRouter();
  const mediaId = router.query.id as string;
  const { loading, error, data } = useQuery<IMediaDetailResponse, IMediaDetailQueryParams>(getMediaDetail, {
    variables: { id: +mediaId },
  });

  if (error) return <Error statusCode={404} />;
  if (loading) return <div className='w-screen h-screen flex items-center justify-center'><span>Loading...</span></div>;
  return data ? (
    <div className='w-full'>
      <BannerSection
        averageScore={data?.media.averageScore}
        popularity={data?.media.popularity}
        bannerImage={data?.media.bannerImage}
      />
      <div className='w-full space-y-6 pt-6 pb-14'>
        <DescriptionSection id={+mediaId} title={data?.media.title} type={data.media.type} description={data?.media.description} coverImage={data?.media.coverImage} />
        <AttributesSection data={data?.media} />
        <IntersectionObserverContainer threshold={0.1} once={true} placeHolder={<MediaListSkeleton />}>
          <RelationSection id={+mediaId} />
        </IntersectionObserverContainer>
        <IntersectionObserverContainer threshold={0.1} once={true} placeHolder={<TagListSkeleton />}>
          <TagListSection id={+mediaId} />
        </IntersectionObserverContainer>
      </div>
    </div>
  ) : <></>;
};

export default MediaDetailView;
