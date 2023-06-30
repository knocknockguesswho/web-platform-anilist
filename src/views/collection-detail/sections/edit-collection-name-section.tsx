import Button from 'Components/atoms/button';
import React from 'react';
import { CollectionDetailCtx } from '../collection-detail-context-provider';
import EditCollectionModal from 'Components/templates/edit-collection-modal';
import { IAnimeCollectionData, updateCollection } from 'Assets/constant/anime-collection-db';

const EditCollectionNameSection = () => {
  const [state, setState] = React.useContext(CollectionDetailCtx);
  return (
    <section id='collection-detail-edit-collection-name'>
      <Button onClick={() => setState((prev) => ({ ...prev, isEditCollectionModalActive: true }))}>Edit</Button>
      {state.isEditCollectionModalActive &&
      <EditCollectionModal
        collectionName={state.collectionDetail?.name as string}
        onClose={() => setState((prev) => ({ ...prev, isEditCollectionModalActive: false }))}
        onEditCollection={(collection) => {
          updateCollection({ id: state.collectionDetail?.id as number, name: collection.name, items: state.collectionDetail?.items ?? [] })
            .then(() => {
              setState((prev) => ({
                ...prev,
                isEditCollectionModalActive: false,
                collectionDetail: {
                  ...prev.collectionDetail as IAnimeCollectionData,
                  name: collection.name,
                },
              }));
            })
            .catch(() => alert('You already have it in your collection'));
        }}
      />}
    </section>
  );
};

export default EditCollectionNameSection;
