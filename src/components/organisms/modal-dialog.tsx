import React from 'react';
import Overlay, { IProps as IOverlayProps } from 'Components/atoms/overlay';
import Button from 'Components/atoms/button';

export interface IModalDialogAction {
  label: string;
  onClick: () => void;
}

interface IProps extends IOverlayProps {
  title: string;
  message: React.ReactNode;
  primaryAction: IModalDialogAction;
  secondaryAction?: IModalDialogAction;
  onClose: () => void;
}

const ModalDialog = (props: IProps) => {
  const { title, message, primaryAction, secondaryAction, onClose, ...args } = props;
  return (
    <Overlay
      {...args}
      className={['flex flex-col items-center justify-center space-y-4', props.className].join(' ').trim()}
      onOuterContainerClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className='w-full small-phone:max-w-[300px] small-desktop:min-w-[600px] bg-white rounded p-4 space-y-4'>
        <h3 className='text-[28px] font-bold'>{title}</h3>
        <p>{message}</p>
        <div className='w-full flex flex-row justify-end'>
          <div className='flex flex-row space-x-2'>
            <Button onClick={primaryAction.onClick}>{primaryAction.label}</Button>
            {secondaryAction && <Button variant='secondary' onClick={secondaryAction.onClick}>{secondaryAction.label}</Button>}
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default ModalDialog;
