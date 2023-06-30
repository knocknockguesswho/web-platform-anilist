import React from 'react';
import CardMedia from 'Components/organisms/card-media';
import Link from 'next/link';
import ModalDialog from 'Components/organisms/modal-dialog';
import Button from 'Components/atoms/button';
import { useRouter } from 'next/router';
import { IAnimeCollectionData, IAnimeCollectionDataItem, fetchDataById, removeCollectionItem } from 'Assets/constant/anime-collection-db';
import { CollectionDetailCtx } from '../collection-detail-context-provider';

const MediaListSection = () => {
  const router = useRouter();
  const collectionId = router.query.id as string;
  const [state, setState] = React.useContext(CollectionDetailCtx);
  React.useEffect(() => {
    if (collectionId) {
      fetchDataById(+collectionId)
        .then((res) => setState((prev) => ({ ...prev, collectionDetail: res })))
        .catch((err) => console.error(err, 'Initial Fetch'));
    }
  }, [collectionId, setState, state.isEditCollectionModalActive]);

  return (
    <section id='collection-detail-media-list' className='pt-4 space-y-4'>
      <h1>{state.collectionDetail?.name}</h1>
      <div className='flex gap-2 flex-row flex-wrap items-baseline'>
        {state.collectionDetail?.items?.map((item) => {
          return (
            <div key={item.id} className=' flex flex-col items-center space-y-2'>
              <Link
                href={{
                  pathname: '/[media_type]/detail/[id]',
                  query: {
                    media_type: item.type?.toLowerCase(),
                    id: item.id,
                  },
                }}
                className='last:pr-4 desktop:last:pr-0'>
                <CardMedia item={item} />
              </Link>
              <Button className='bg-red-500 text-xs' onClick={() => setState((prev) => ({ ...prev, selectedItemIdToRemove: item.id }))}>Remove</Button>
            </div>
          );
        })}
      </div>
      {state.selectedItemIdToRemove !== null &&
        <ModalDialog
          title='Are you sure to remove this item?'
          message={<>Remove <strong>{state.collectionDetail?.items?.find((item) => item.id === state.selectedItemIdToRemove)?.title?.userPreferred}</strong></>}
          primaryAction={{
            label: 'Remove',
            onClick: async () => {
              const tempCollectionDetailItems = [...state.collectionDetail?.items as Array<IAnimeCollectionDataItem>];
              tempCollectionDetailItems.splice(tempCollectionDetailItems.findIndex((item) => item.id === state.selectedItemIdToRemove), 1);
              await removeCollectionItem(state.collectionDetail?.id as number, state.selectedItemIdToRemove as number);
              setState((prev) => ({
                ...prev,
                selectedItemIdToRemove: null,
                collectionDetail: { ...prev.collectionDetail as IAnimeCollectionData, items: tempCollectionDetailItems },
              }));
            },
          }}
          secondaryAction={{
            label: 'Cancel',
            onClick: () => setState((prev) => ({ ...prev, selectedItemIdToRemove: null })),
          }}
          onClose={() => setState((prev) => ({ ...prev, selectedItemIdToRemove: null }))}
        />
      }
    </section>
  );
};

export default MediaListSection;
