import React from 'react';
import Button from 'Components/atoms/button';
import Input from 'Components/atoms/input';
import { inputPattern, validateCollectionName } from 'Helpers/validation';
import { IAnimeCollectionData } from 'Assets/constant/anime-collection-db';
import Overlay, { IProps as IOverlayProps } from 'Components/atoms/overlay';

interface IProps extends IOverlayProps {
  onClose: () => void;
  onAddNewCollection?: (data: IAnimeCollectionData) => void;
}

const AddNewCollectionModal = (props: IProps) => {
  /**
   * name should:
   * - not empty
   * - not containing special chars
   */
  const { onAddNewCollection, onClose, ...args } = props;
  const [errorMessage, setErrorMessage] = React.useState('');
  const [newCollectionName, setNewCollectionName] = React.useState('');
  return (
    <Overlay
      {...args}
      id='add-new-collection-modal'
      onOuterContainerClick={onClose}
      className={['flex flex-col items-center justify-center', args.className].join(' ').trim()}>
      <div onClick={(e) => e.stopPropagation()} className='px-4 desktop:p-0'>
        <div className='w-full min-w-[300px] space-y-4 small-phone:max-w-[300px] small-desktop:min-w-[600px] bg-white rounded p-4'>
          <h2>Add New Collection</h2>
          <div className='items-center space-y-4'>
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
                onAddNewCollection && onAddNewCollection({ name: newCollectionName, items: [] });
              }}>Save</Button>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default AddNewCollectionModal;
