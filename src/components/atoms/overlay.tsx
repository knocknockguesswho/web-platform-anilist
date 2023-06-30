import React from 'react';
import { createPortal } from 'react-dom';

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  onOuterContainerClick?: () => void;
}
const Overlay = (props: IProps) => {
  const { onOuterContainerClick, ...args } = props;
  return createPortal(
    <div {...args} onClick={onOuterContainerClick} className={['w-full h-screen fixed inset-0 bg-soft-black/75 z-[100] fade-in-100', props.className].join(' ').trim()}>
      {props.children}
    </div>,
    document.body
  );
};

export default Overlay;
