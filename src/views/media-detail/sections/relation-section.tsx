import React from 'react';
import MediaListHorizontalTemplate from 'Components/templates/media-list-horizontal-template';
import { useQuery } from '@apollo/client';
import { IMediaDetailQueryParams, IMediaDetailRelationResponse, getMediaDetailRelations } from 'graphql/media-detail';
import MediaListSkeleton from 'Components/templates/skeleton/media-list-sekeleton';

interface IProps {
  id: number;
}

const RelationSection = (props: IProps) => {
  const { loading, data } = useQuery<IMediaDetailRelationResponse, IMediaDetailQueryParams>(getMediaDetailRelations, {
    variables: { id: props.id },
  });
  if (loading) return <MediaListSkeleton />;
  return data?.media ? (
    <section id='media-detail-relation-section'>
      <MediaListHorizontalTemplate title='Relations' data={data?.media.relations?.nodes} />
    </section>
  ) : <></>;
};

export default RelationSection;
