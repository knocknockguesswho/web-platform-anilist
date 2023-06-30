import React from 'react';
import Overlay, { IProps as IOverlayProps } from 'Components/atoms/overlay';
import { IAnimeCollectionData, IAnimeCollectionDataItem, fetchCollectionName } from 'Assets/constant/anime-collection-db';
import Input from 'Components/atoms/input';
import Button from 'Components/atoms/button';
import Scrollview from 'Components/atoms/scrollview';
import Image from 'Components/atoms/image';
import { inputPattern, validateCollectionName } from 'Helpers/validation';

export type TCollectionNameList = Array<Pick<IAnimeCollectionData, 'id' | 'name'>>;
export interface IProps extends IOverlayProps {
  /**items to be addded to collection(s) */
  items: Array<IAnimeCollectionDataItem>
  onClose: () => void;
  onRemove: (selected: IAnimeCollectionDataItem) => void;
  onUpdateCollection?: (datas: Array<IAnimeCollectionData>) => void;
  onAddNewCollection?: (data: IAnimeCollectionData) => void;
}

const AddNewCollectionElement = (props: Pick<IProps, 'items' | 'onAddNewCollection'>) => {
  /**
   * name should:
   * - not empty
   * - not containing special chars
   */
  const [errorMessage, setErrorMessage] = React.useState('');
  const [newCollectionName, setNewCollectionName] = React.useState('');
  return (
    <div id='collection-modifier-add-new' className='items-center space-y-4'>
      <Input
        label='Name'
        value={newCollectionName}
        required={true}
        errorMessage={errorMessage}
        autoFocus={true}
        pattern={inputPattern.collectionName}
        onChange={(e) => {
          setNewCollectionName(e.target.value);
          setErrorMessage('');
        }}
      />
      <Button
        className='w-full'
        onClick={() => {
          if (newCollectionName === '') return setErrorMessage('Name cannot be empty');
          if (!validateCollectionName(newCollectionName)) return setErrorMessage('Name cannot containing special characters');
          props.onAddNewCollection && props.onAddNewCollection({ name: newCollectionName, items: props.items });
        }}>Save</Button>
    </div>
  );
};

const UpdateCollectionElement = (props: { collections: TCollectionNameList } & Pick<IProps, 'items' | 'onUpdateCollection'>) => {
  const [selectedCollections, setSelectedCollections] = React.useState<Array<TCollectionNameList[number]['id']>>([]);
  return (
    <div className='flex flex-col space-y-2 p-4 bg-slate-100'>
      <h3 className='font-bold'>Select Collection</h3>
      <div className='grid grid-flow-row grid-cols-1 desktop:grid-cols-2'>
        {props.collections.map((collection) => {
          return (
            <div key={collection.id} className='flex flex-row items-center space-x-2'>
              <input
                type='checkbox'
                name='Collection Name'
                checked={selectedCollections.includes(collection.id)}
                // onChange={(e) => e.target.checked}
                id={String(collection.id)}
                onChange={() => {
                  const tempSelectedCollections = [...selectedCollections];
                  if (tempSelectedCollections.includes(collection.id)) tempSelectedCollections.splice(tempSelectedCollections.indexOf(collection.id), 1);
                  else tempSelectedCollections.push(collection.id);
                  setSelectedCollections(tempSelectedCollections);
                }}
              />
              <span>{collection.name}</span>
            </div>
          );
        })}
      </div>
      <Button
        disabled={selectedCollections.length === 0}
        className={selectedCollections.length === 0 ? 'bg-gray-300 cursor-not-allowed' : ''}
        onClick={() => {
          if (selectedCollections.length > 0) {
            props.onUpdateCollection && props.onUpdateCollection(selectedCollections.map((id) => ({
              id: id,
              name: props.collections.find((collection) => collection.id === id)?.name as string,
              items: props.items,
            })));
          }
        }}>Add items</Button>
      {selectedCollections.length === 0 && <span>Please select at least 1 collection</span>}
    </div>
  );
};
/**
 * should:
 * - force to create new collection if none
 * - name should be alphanumeric without `special char`
 * - either update the existing collection `items` or create new collection and add the `items`
 *  - prevent to add new collection name with conflicting naming with others
 *  - prevent to add data to collection if already exists
 *
 * flow:
 * - open modal when click `item` (including `item` detail like id, title, etc.)
 * - show collection list including its name, (with thumbnail of first `item` coverImage)
 * - if none of collection on list, prompt to create new one
 * - select one or many of collections to add the `item` to them (will show status of selected collection)
 * - click save to store item to the selected collection
 */
const CollectionModifierModal = (props: IProps) => {
  const [isAddingNewCollection, setIsAddingNewCollection] = React.useState(false);
  const [collections, setCollections] = React.useState<TCollectionNameList>([]);
  const { items, onClose, onRemove, onUpdateCollection, onAddNewCollection, ...args } = props;
  React.useEffect(() => {
    fetchCollectionName()
      .then((res) => setCollections(res))
      .catch((err) => console.error(err));
  }, []);
  return (
    <Overlay
      {...args}
      onOuterContainerClick={onClose}
      className={['flex flex-col items-center justify-center space-y-4', props.className].join(' ').trim()}>
      <div onClick={(e) => e.stopPropagation()} className='px-4 desktop:p-0'>
        <div className='w-full min-w-[300px] h-[400px] space-y-4 small-phone:max-w-[300px] small-desktop:min-w-[600px] desktop:h-[600px] bg-white rounded p-4 overflow-y-scroll'>
          <div className='bg-slate-100 space-y-2 pt-4'>
            <h3 className='font-bold px-4'>Items to be added</h3>
            <Scrollview className='px-4 desktop:px-0 space-x-4 pb-4'>
              {props.items?.map((item) => {
                return (
                  <div key={item.id} className='flex flex-col items-center text-center space-y-2 last:pr-4'>
                    <div
                      id='collection-modifier-list-image-container'
                      className='w-[50px] phone:w-[80px] desktop:w-[100px] aspect-[0.71] overflow-hidden rounded shadow-card'
                      style={{ background: item.coverImage?.color }}>
                      <Image
                        width={100}
                        height={140}
                        src={item?.coverImage?.large ?? ''}
                        alt='Media Cover Image'
                        placeholder='blur'
                        objectFit='cover'
                        className='w-full aspect-[0.71]'
                      />
                    </div>
                    <span className='w-[50px] phone:w-[80px] desktop:w-[100px] line-clamp-1 font-medium leading-tight text-xs'>{item?.title?.userPreferred}</span>
                    <Button className='px-3 shadow-lg bg-red-500 text-xs' onClick={() => onRemove(item)}>Remove</Button>
                  </div>
                );
              })}
            </Scrollview>
          </div>
          {isAddingNewCollection || collections?.length === 0
            ? <AddNewCollectionElement items={items} onAddNewCollection={onAddNewCollection} />
            : <>
              <UpdateCollectionElement collections={collections} items={items} onUpdateCollection={onUpdateCollection} />
              <div className='w-full px-4'>
                <Button variant='secondary' onClick={() => setIsAddingNewCollection(true)} className='w-full'>Add New Collection</Button>
              </div>
            </>
          }
        </div>
      </div>
    </Overlay>
  );
};

export default CollectionModifierModal;
