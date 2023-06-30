import React from 'react';
import CollectionListSection from './sections/collection-list-section';
import CollectionListCtxProvider from './collection-list-context-provider';
import AddNewCollectionSection from './sections/add-new-collection-section';

const CollectionListPageView = () => {
  return (
    <div className='w-full pt-4 pb-14 px-4 desktop:px-0 space-y-6'>
      <h1>Collection List</h1>
      <CollectionListCtxProvider>
        <AddNewCollectionSection />
        <CollectionListSection />
      </CollectionListCtxProvider>
    </div>
  );
};

export default CollectionListPageView;
