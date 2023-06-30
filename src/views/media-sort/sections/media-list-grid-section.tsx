import React from 'react';
import Link from 'next/link';
import CardMedia from 'Components/organisms/card-media';
import MediaListGridSekeleton from 'Components/templates/skeleton/media-list-grid-skeleton';
import { IAnilistMedia, MEDIA_SORT_PARAMS, MEDIA_TYPE, sortNameMap, typeNameMap } from 'Helpers/interfaces/anilist-media';
import { IMediaListQueryParams, IMediaListResponse, getMediaList } from 'graphql/media-list';
import { useQuery } from '@apollo/client';
import { useIntersectionListener } from 'Helpers/custom-hooks';

interface IProps {
  mediaSortQuery: string;
  mediaTypeQuery: string;
}

// TODO: add go to top button
const MediaListGridSection = (props: IProps) => {
  const [page, setPage] = React.useState(1);
  const [datas, setDatas] = React.useState<Array<IAnilistMedia>>([]);
  const sortNameQuery = Object.fromEntries(
    Object.entries(sortNameMap).map(([k, v]) => [v, k])
  ) as Record<string, MEDIA_SORT_PARAMS>;
  const typeNameQuery = Object.fromEntries(
    Object.entries(typeNameMap).map(([k, v]) => [v, k])
  ) as Record<string, MEDIA_TYPE>;
  const { loading, error, data } = useQuery<IMediaListResponse, IMediaListQueryParams>(getMediaList, {
    variables: {
      page: page,
      perPage: 10,
      sort: sortNameQuery[props.mediaSortQuery],
      type: typeNameQuery[props.mediaTypeQuery],
    },
    notifyOnNetworkStatusChange: true,
  });

  React.useEffect(() => {
    if (data?.data.media && data.data.media.length > 0) {
      setDatas((prev) => [...prev, ...data?.data.media as Array<IAnilistMedia>]);
    }
  }, [data]);

  React.useEffect(() => {
    setPage(1);
  }, [props.mediaSortQuery, props.mediaTypeQuery]);

  const [isInView, setIsInView] = React.useState(false);
  const threshold = 1;
  const onIntersectionChange = React.useCallback((inView: boolean) => {
    setIsInView(inView);
  }, []);
  const onIntersectionRatioChange = React.useCallback((value: number) => {
    if (value > threshold) {
      setIsInView(true);
    }
  }, [threshold]);

  const intersectionref = useIntersectionListener({
    onIntersectionChange,
    onIntersectionRatioChange,
    threshold,
  });

  React.useEffect(() => {
    if (isInView && !loading && !error && data?.data.pageInfo.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [data, loading, isInView, error]);

  if (loading && page === 1) return <MediaListGridSekeleton />;
  return !error || datas.length > 0 ? (
    <section id='media-list-grid' className='space-y-6'>
      <ul className='grid grid-flow-row gap-6 grid-cols-2 tablet:grid-cols-3 small-desktop:grid-cols-4 desktop:grid-cols-5'>
        {datas.map((item, idx) => {
          return (
            <Link key={item.id} href={`/${props.mediaTypeQuery}/detail/${item.id}`} className='last:pr-4 desktop:last:pr-0'>
              <CardMedia item={item} isPrioritized={idx < 6} />
            </Link>
          );
        })}
      </ul>
      <div ref={intersectionref} />
      {loading && <MediaListGridSekeleton />}
    </section>
  ) : <></>;
};

export default MediaListGridSection;
