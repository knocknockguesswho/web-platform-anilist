import React from 'react';
import ChevronDown from 'Assets/icon/chevron-down';

export interface IDropdownOption { id: number | string; label: string; }
export interface IProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  options: Array<IDropdownOption>;
  placeholder: string;
  selected?: IDropdownOption;
  errorMessage?: string;
  onSelect: (val: IDropdownOption) => void;
}
const Dropdown = (props: IProps) => {
  const [isOpened, setIsOpened] = React.useState(false);
  return (
    <div id={props.id}>
      <div
        className={['flex flex-col w-auto select-none relative rounded-lg z-10 capitalize shadow', props.className].join(' ').trim()}
        style={props.style}>
        <button
          onClick={() => setIsOpened((prev) => !prev)}
          className={[
            'w-full flex flex-row py-3 px-4 justify-between items-center rounded-t-lg bg-overlay/5 cursor-pointer rounded-b-lg',
            props.selected ? 'text-blue' : 'text-black',
          ].join(' ').trim()}>
          <span>{props.selected?.label ?? props.placeholder}</span>
          <ChevronDown
            size={16}
            color='grey'
            className={[
              'transition-all duration-[50]',
              isOpened ? 'rotate-180' : '',
            ].join(' ').trim()}
          />
        </button>
        <div
          role='listbox'
          tabIndex={0}
          aria-label={props.placeholder}
          className={[
            'bg-white rounded-b-xl flex flex-col overflow-auto max-h-[200px] absolute left-0 right-0 translate-y-12 shadow-xl',
            isOpened ? 'border-t border-blue/20' : 'h-0',
          ].join(' ').trim()}>
          {props.options.map((option) => {
            return (
              <span
                key={option.id}
                role='option'
                aria-selected={props.selected?.id === option.id}
                onClick={() => {
                  props.onSelect(option);
                  setIsOpened(false);
                }}
                className={[
                  'cursor-pointer px-4 py-2',
                  props.selected?.id === option.id ? 'bg-blue text-white' : 'hover:bg-blue/20 text-blue',
                ].join(' ').trim()}>
                {option.label}
              </span>
            );
          })}
        </div>
      </div>
      {!!props.errorMessage && <span className='text-xs text-red-500'>{props.errorMessage}</span>}
    </div>
  );
};

export default Dropdown;
