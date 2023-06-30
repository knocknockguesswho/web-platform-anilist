import React from 'react';

export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  rightButton?: React.ReactElement;
  errorMessage?: string;
  hideLabel?: boolean;
  caption?: React.ReactNode;
  labelAlwaysOnTop?: boolean;
}
const Input = (props: IProps) => {
  const { label, rightButton, errorMessage, hideLabel, caption, labelAlwaysOnTop, ...args } = props;
  const [isFocus, setIsFocus] = React.useState(false);
  const memoizedDynamicLabelPositionStyle = React.useMemo(() => {
    return (isFocus || props.value !== '') ? '-translate-y-1/2' : 'translate-y-1/2 text-opacity-75';
  }, [isFocus, props.value]);
  return (
    <div className='w-full flex flex-col relative'>
      <hr className='sr-only' />
      <label
        hidden={hideLabel}
        htmlFor={props.id}
        className={[
          'mb-2 absolute top-0 px-2 left-2 z-10 bg-white transition-all duration-100 ease-linear select-none cursor-text',
          labelAlwaysOnTop ? '-translate-y-1/2' : memoizedDynamicLabelPositionStyle,
          isFocus ? 'text-blue' : 'text-soft-black',
        ].join(' ').trim()}>
        {props.required && <span className='text-red-500'>*</span>}{label}
      </label>
      <div className='relative'>
        <input
          {...args}
          aria-errormessage={errorMessage}
          placeholder={isFocus ? '' : props.placeholder}
          className={[
            'w-full bg-white text-black border border-black px-4 py-3 bg-white-smoke rounded placeholder-transparent',
            !isFocus && errorMessage ? 'border-red-500 focus:border-red-500' : '',
            isFocus ? 'border-blue' : '',
            props.className,
          ].join(' ').trim()}
          onFocus={(e) => {
            props.onFocus && props.onFocus(e);
            setIsFocus(true);
          }}
          onBlur={(e) => {
            props.onBlur && props.onBlur(e);
            setIsFocus(false);
          }}
        />
        <div className='absolute right-[15px] top-1/2 -translate-y-1/2'>
          {rightButton}
        </div>
      </div>
      <div className='flex flex-col m-1'>
        {!!caption && <span className='text-xs text-black text-left'>{caption}</span>}
        {!!errorMessage && <span className='text-xs text-red-500'>{errorMessage}</span>}
      </div>
    </div>
  );
};

export default Input;
