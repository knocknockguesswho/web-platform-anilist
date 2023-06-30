import React from 'react';

interface IProps extends React.HTMLAttributes<HTMLHRElement> {}
const Divider = (props: IProps) => {
  return (
    <hr {...props} className={['w-full h-px bg-blue-100', props.className].join(' ').trim()} />
  );
};

export default Divider;
