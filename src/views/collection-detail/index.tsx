import React from 'react';
import MediaListSection from './sections/media-list-section';
import CollectionDetailCtxProvider from './collection-detail-context-provider';
import EditCollectionNameSection from './sections/edit-collection-name-section';

const CollectionDetailPageView = () => {
  return (
    <div className='w-full pt-4 pb-14 px-4 desktop:px-0'>
      <CollectionDetailCtxProvider>
        <EditCollectionNameSection />
        <MediaListSection />
      </CollectionDetailCtxProvider>
    </div>
  );
};

export default CollectionDetailPageView;
