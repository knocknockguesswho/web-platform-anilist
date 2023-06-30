import React from 'react';
import DomPurifyContainer from 'Components/atoms/dom-purify-container';
import Image from 'Components/atoms/image';
import Button from 'Components/atoms/button';
import DescriptionModal from 'Components/organisms/description-modal';
import { IAnilistMedia } from 'Helpers/interfaces/anilist-media';
import CollectionModifierModal from 'Components/templates/collection-modifier-modal';
import { IAnimeCollectionData, IAnimeCollectionDataItem, addNewCollectionWithData, appendCollectionItem } from 'Assets/constant/anime-collection-db';
import NewlyAddedCollectionList from 'Components/templates/newly-added-collection-list';
import { emptyImage } from 'Assets/constant/data';
import { useRouter } from 'next/router';

interface IProps {
  id: IAnilistMedia['id'];
  title: IAnilistMedia['title'];
  type: IAnilistMedia['type'];
  coverImage?: IAnilistMedia['coverImage'];
  description: IAnilistMedia['description'];
}

const DescriptionSection = (props: IProps) => {
  const router = useRouter();
  const [isDescriptionModalOpened, setIsDescriptionModalOpened] = React.useState(false);
  const [isCollectionModifierModalActive, setIsCollectionModifierModalActive] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<Array<IAnimeCollectionDataItem>>([{ id: props.id, title: props.title, type: props.type, coverImage: props.coverImage }]);

  const [latestCollectionUpdated, setLatestCollectionUpdated] = React.useState<Array<IAnimeCollectionData['id']>>([]);
  React.useEffect(() => {
    // reset if collection modifier modal closed
    if (!isCollectionModifierModalActive) setSelectedItems([{ id: props.id, title: props.title, type: props.type, coverImage: props.coverImage }]);
  }, [isCollectionModifierModalActive, props.coverImage, props.id, props.title, props.type]);
  return (
    <section id='media-detail-description' className='w-full flex flex-row px-4 desktop:px-10 space-x-4'>
      <div
        className='w-[120px] tablet:w-[120px] desktop:w-[150px] relative text-center space-y-2'>
        <Image
          width={213}
          height={300}
          src={props.coverImage?.large ?? emptyImage.cover}
          alt='Media Cover Image'
          objectFit='cover'
          className='w-full aspect-[0.71] rounded shadow-lg'
          priority={true}
          style={{ background: props.coverImage?.color }}
        />
        <Button onClick={() => setIsCollectionModifierModalActive(true)} variant='primary' className='w-full text-center text-[11px] desktop:text-sm p-0'>+ Collection</Button>
      </div>
      {props.description &&
        <>
          <div className='w-full h-[150px] overflow-hidden space-y-2 relative'>
            <h1 className='font-bold line-clamp-1 text-base'>{props.title?.userPreferred}</h1>
            <DomPurifyContainer data={props.description} className='w-full whitespace-normal text-sm' />
            <div className='absolute fog-white-soft w-full h-full bottom-0 flex items-end justify-center'>
              <Button variant='secondary' className='text-xs bg-white' onClick={() => setIsDescriptionModalOpened(true)}>Read More</Button>
            </div>
          </div>
          {isDescriptionModalOpened &&
            <DescriptionModal
              id='media-detail-description-modal'
              title={props.title?.userPreferred}
              description={props.description}
              onClose={() => setIsDescriptionModalOpened(false)}
            />
          }
        </>
      }
      {isCollectionModifierModalActive &&
      <CollectionModifierModal
        items={[{ id: props.id, title: props.title, type: props.type, coverImage: props.coverImage }]}
        onClose={() => setIsCollectionModifierModalActive(false)}
        onRemove={(removedItem) => {
          const remainingItems = selectedItems.filter((item) => { return item.id !== removedItem.id; });
          setSelectedItems(remainingItems);
        }}
        onAddNewCollection={(collection) => {
          addNewCollectionWithData(collection)
            .then(() => {
              setIsCollectionModifierModalActive(false);
              setLatestCollectionUpdated([collection.id as number]);
            })
            .catch(() => alert('You already have it in your collection'));
        }}
        onUpdateCollection={async (collectionList) => {
          const updatedCollections: Array<IAnimeCollectionData['id']> = [];
          collectionList.forEach((list) => {
            appendCollectionItem({ id: list.id, name: list.name, items: list.items });
            updatedCollections.push(list.id as number);
          });
          setIsCollectionModifierModalActive(false);
          setLatestCollectionUpdated(updatedCollections);
        }}
      />}

      {latestCollectionUpdated.length > 0 &&
        <NewlyAddedCollectionList
          collectionIds={latestCollectionUpdated}
          onClose={() => setLatestCollectionUpdated([])}
          onCollectionClick={(id) => {
            setLatestCollectionUpdated([]);
            router.push(`/collection/detail/${id}`);
          }}
        />
      }
    </section>
  );
};

export default DescriptionSection;
