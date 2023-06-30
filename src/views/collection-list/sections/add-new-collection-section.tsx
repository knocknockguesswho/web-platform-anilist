import React from 'react';
import Button from 'Components/atoms/button';
import AddNewCollectionModal from 'Components/templates/add-new-collection-modal';
import { addNewCollectionWithData } from 'Assets/constant/anime-collection-db';
import { CollectionListCtx } from '../collection-list-context-provider';

const AddNewCollectionSection = () => {
  const [state, setState] = React.useContext(CollectionListCtx);
  return (
    <section id='collection-landing-page-add-new'>
      <Button onClick={() => setState((prev) => ({ ...prev, isCollectionModifierModalActive: true }))}>Add New Collection</Button>
      {state.isCollectionModifierModalActive &&
      <AddNewCollectionModal
        onClose={() => setState((prev) => ({ ...prev, isCollectionModifierModalActive: false }))}
        onAddNewCollection={(collection) => {
          addNewCollectionWithData(collection)
            .then(() => {
              setState((prev) => ({ ...prev, isCollectionModifierModalActive: false }));
            })
            .catch(() => alert('You already have it in your collection'));
        }}
      />}
    </section>
  );
};

export default AddNewCollectionSection;
