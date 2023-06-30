import React from 'react';
import Image from 'Components/atoms/image';
import ModalDialog from 'Components/organisms/modal-dialog';
import Button from 'Components/atoms/button';
import { fetchCollectionName, removeCollection, updateCollection } from 'Assets/constant/anime-collection-db';
import { emptyImage } from 'Assets/constant/data';
import { useRouter } from 'next/router';
import { CollectionListCtx } from '../collection-list-context-provider';
import EditCollectionModal from 'Components/templates/edit-collection-modal';

const CollectionListSection = () => {
  const router = useRouter();
  const [state, setState] = React.useContext(CollectionListCtx);
  // const [selectedItemToRemove, setSelectedItemToRemove] = React.useState<IAnimeCollectionData | null>(null);
  React.useEffect(() => {
    fetchCollectionName()
      .then((result) => setState((prev) => ({ ...prev, collectionList: result })));
  }, [setState, state.isCollectionModifierModalActive, state.selectedItemToEdit]);
  return state.collectionList ? (
    <section id='collection-landing-page-collection-list' className='space-y-4'>
      <div className='flex gap-4 flex-row flex-wrap items-baseline'>
        {state.collectionList?.map((collection) => {
          return (
            <div
              key={collection.id}
              className='w-[75px] flex flex-col items-center space-y-2 text-center cursor-pointer'
              onClick={() => {
                router.push(`/collection/detail/${collection.id}`);
              }}>
              <div className='w-[75px] h-[108px] shadow-xl'>
                <Image
                  src={(collection.items && collection.items.length > 0 && collection.items[0]) ? collection.items[0].coverImage?.large as string : emptyImage.cover}
                  width={75}
                  height={108}
                  objectFit='cover'
                  className='aspect-[0.71] rounded'
                  alt='Collection Thumbnail'
                />
              </div>
              <span className='line-clamp-2 text-xs'>{collection.name}</span>
              <Button
                className='bg-red-500 text-xs'
                onClick={(e) => {
                  setState((prev) => ({ ...prev, selectedItemToRemove: collection }));
                  e.stopPropagation();
                }}>
                Remove
              </Button>
              <Button
                variant='secondary'
                className='text-xs'
                onClick={(e) => {
                  setState((prev) => ({ ...prev, selectedItemToEdit: collection }));
                  e.stopPropagation();
                }}>
                Edit
              </Button>
            </div>
          );
        })}
      </div>
      {state.selectedItemToRemove !== null &&
          <ModalDialog
            title='Are you sure to remove this collection?'
            message={<>Remove <strong>{state.selectedItemToRemove.name}</strong></>}
            primaryAction={{
              label: 'Remove',
              onClick: async () => {
                const tempCollectionList = [...state.collectionList];
                tempCollectionList.splice(tempCollectionList.findIndex((collection) => collection.id === state.selectedItemToRemove?.id), 1);
                await removeCollection(state.selectedItemToRemove?.id);
                setState((prev) => ({ ...prev, collectionList: tempCollectionList }));
                setState((prev) => ({ ...prev, selectedItemToRemove: null }));
              },
            }}
            secondaryAction={{
              label: 'Cancel',
              onClick: () => setState((prev) => ({ ...prev, selectedItemToRemove: null })),
            }}
            onClose={() => setState((prev) => ({ ...prev, selectedItemToRemove: null }))}
          />
      }
      {state.selectedItemToEdit !== null &&
      <EditCollectionModal
        collectionName={state.selectedItemToEdit?.name as string}
        onClose={() => setState((prev) => ({ ...prev, selectedItemToEdit: null }))}
        onEditCollection={(collection) => {
          updateCollection({ id: state.selectedItemToEdit?.id as number, name: collection.name, items: state.selectedItemToEdit?.items ?? [] })
            .then(() => {
              setState((prev) => ({
                ...prev,
                selectedItemToEdit: null,
              }));
            })
            .catch(() => alert('You already have it in your collection'));
        }}
      />}
    </section>
  ) : <></>;
};

export default CollectionListSection;
