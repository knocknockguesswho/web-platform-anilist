import React from 'react';
import Overlay, { IProps as IOverlayProps } from 'Components/atoms/overlay';
import Button from 'Components/atoms/button';
import DomPurifyContainer from 'Components/atoms/dom-purify-container';

interface IProps extends IOverlayProps {
  /**html string */
  title?: string;
  description: string;
  onClose?: () => void;
}

const DescriptionModal = (props: IProps) => {
  const { title, description, onClose, ...args } = props;
  return (
    <Overlay
      {...args}
      onOuterContainerClick={onClose}
      className={['flex flex-col items-center justify-center space-y-4', props.className].join(' ').trim()}>
      <div onClick={(e) => e.stopPropagation()} className='px-4 desktop:p-0'>
        <div className='w-full max-w-[400px] h-[400px] desktop:max-w-[600px] desktop:h-[600px] bg-white rounded space-y-2 p-4 overflow-y-scroll'>
          <h3 className='font-bold'>{title}</h3>
          <DomPurifyContainer data={description} />
        </div>
      </div>
      <Button variant='primary' onClick={onClose}>Close</Button>
    </Overlay>
  );
};

DescriptionModal.defaultProps = {
  title: 'Description',
};

export default DescriptionModal;
