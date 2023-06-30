import React from 'react';
import { useQuery } from '@apollo/client';
import { IMediaListQueryParams, IMediaListResponse, getMediaList } from 'graphql/media-list';
import { MEDIA_SORT_PARAMS, MEDIA_TYPE, sortNameMap, typeNameMap } from 'Helpers/interfaces/anilist-media';
import MediaListHorizontalTemplate from 'Components/templates/media-list-horizontal-template';

interface IProps {
  selectedMediaType: MEDIA_TYPE;
  withDivider?: boolean;
}

const BestScoreSection = (props: IProps) => {
  const { loading, error, data } = useQuery<IMediaListResponse, IMediaListQueryParams>(getMediaList, {
    variables: {
      page: 1,
      perPage: 5,
      sort: MEDIA_SORT_PARAMS.SCORE_DESC,
      type: props.selectedMediaType,
    },
  });
  return (
    <section id='home-media-list-best-score'>
      <MediaListHorizontalTemplate
        title='Best Score'
        loading={loading}
        error={error}
        data={data?.data.media}
        viewAllHref={`/${typeNameMap[props.selectedMediaType]}/list/${sortNameMap[MEDIA_SORT_PARAMS.SCORE_DESC]}`}
        withDivider={props.withDivider}
      />
    </section>
  );
};

BestScoreSection.defaultProps = {
  withDivider: true,
};

export default BestScoreSection;
