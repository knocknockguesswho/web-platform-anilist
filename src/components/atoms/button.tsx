import React from 'react';

export interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}
const Button = (props: IProps) => {
  const classNameByVariant = React.useMemo(() => {
    switch (props.variant) {
      case 'primary':
        return 'text-white bg-black active:pressed';
      case 'secondary':
        return [
          'border',
          props.disabled ? 'cursor-not-allowed border-gray-400 text-gray-400' : 'border-black text-black active:pressed',
        ].join(' ').trim();
    }
  }, [props.variant, props.disabled]);
  return (
    <button
      {...props}
      className={[classNameByVariant, props.className, 'flex-none p-2 rounded-lg font-semibold'].join(' ').trim()}>
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  variant: 'primary',
};

export default Button;
