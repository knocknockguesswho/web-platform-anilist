import React from 'react';
import { IIconContainerProps } from 'Helpers/common-interface';
import dynamic from 'next/dynamic';

const ArrowLeft = dynamic(() => import('Assets/icon/arrow-left'));
const ArrowRight = dynamic(() => import('Assets/icon/arrow-right'));
const ChevronDown = dynamic(() => import('Assets/icon/chevron-down'));
const ChevronUp = dynamic(() => import('Assets/icon/chevron-up'));

const Icon = (props: IIconContainerProps) => {
  const args = { ...props, id: props.name + '-icon' };
  switch (props.name) {
    case 'arrow-left': return <ArrowLeft {...args} />;
    case 'arrow-right': return <ArrowRight {...args} />;
    case 'chevron-down': return <ChevronDown {...args} />;
    case 'chevron-up': return <ChevronUp {...args} />;
    default: return <ChevronUp {...args} />;
  }
};

export default Icon;
