import React from 'react';
import Image from 'Components/atoms/image';
import Overlay, { IProps as IOverlayProps } from 'Components/atoms/overlay';
import { IAnimeCollectionData, bulkFetchCollectionNameById } from 'Assets/constant/anime-collection-db';
import { emptyImage } from 'Assets/constant/data';
import { IndexableType } from 'dexie';

export interface IProps extends IOverlayProps {
  collectionIds?: Array<IAnimeCollectionData['id']>;
  onCollectionClick?: (id: IndexableType) => void;
  onClose?: () => void;
}
const NewlyAddedCollectionList = (props: IProps) => {
  const [collectionList, setCollectionList] = React.useState<Array<IAnimeCollectionData>>([]);
  const { collectionIds, onCollectionClick, onClose, ...args } = props;
  React.useEffect(() => {
    bulkFetchCollectionNameById(collectionIds as Array<number>)
      .then((result) => setCollectionList(result));
  }, [collectionIds]);
  return (
    <Overlay
      {...args}
      id='newly-added-collection-modal'
      className={['flex flex-col items-center justify-center space-y-4', props.className].join(' ').trim()}
      onOuterContainerClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className='w-full h-[400px] space-y-4 small-phone:max-w-[300px] small-desktop:min-w-[600px] desktop:h-[600px] bg-white rounded p-4 overflow-y-scroll'>
        <h3 className='text-[28px] font-bold'>Collection</h3>
        <p>Items already added to these collections</p>
        <div className='flex gap-2 flex-row flex-wrap items-baseline'>
          {collectionList?.map((item) => {
            return (
              <div
                key={item.id}
                className='w-[75px] flex flex-col items-center space-y-2 text-center cursor-pointer'
                onClick={() => onCollectionClick && onCollectionClick(item.id as number)}>
                <div className='w-[75px] h-[108px] shadow-xl'>
                  <Image
                    src={(item.items && item.items?.length > 0 && item.items[0]) ? item.items[0].coverImage?.large as string : emptyImage.cover}
                    width={75}
                    height={108}
                    objectFit='cover'
                    className='aspect-[0.71] rounded'
                    alt='Collection Thumbnail'
                  />
                </div>
                <span className='line-clamp-2 text-xs'>{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Overlay>
  );
};

export default NewlyAddedCollectionList;
