import IconContainer, { IProps } from 'Assets/icon/icon-container';
import { color } from 'Helpers/common-type';

const Grid = (props: IProps) => {
  return (
    <IconContainer {...props}>
      <svg width={props.size} height={props.size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g clipPath='url(#clip0_146_1251)'>
          <path
            d='M0.00390625 2.66667C0.00390625 1.19391 1.19781 0 2.67057 0H8.00391C9.47667 0 10.6706 1.19391 10.6706 2.66667V8C10.6706 9.47276 9.47667 10.6667 8.00391 10.6667H2.67057C1.19781 10.6667 0.00390625 9.47276 0.00390625 8V2.66667Z'
            fill={color[props.color]}
          />
          <path
            d='M13.3372 2.66667C13.3372 1.19391 14.5311 0 16.0039 0H21.3372C22.81 0 24.0039 1.19391 24.0039 2.66667V8C24.0039 9.47276 22.81 10.6667 21.3372 10.6667H16.0039C14.5311 10.6667 13.3372 9.47276 13.3372 8V2.66667Z'
            fill={color[props.color]}
          />
          <path
            d='M13.3372 16C13.3372 14.5272 14.5311 13.3333 16.0039 13.3333H21.3372C22.81 13.3333 24.0039 14.5272 24.0039 16V21.3333C24.0039 22.8061 22.81 24 21.3372 24H16.0039C14.5311 24 13.3372 22.8061 13.3372 21.3333V16Z'
            fill={color[props.color]}
          />
          <path
            d='M0.00390625 16C0.00390625 14.5272 1.19781 13.3333 2.67057 13.3333H8.00391C9.47667 13.3333 10.6706 14.5272 10.6706 16V21.3333C10.6706 22.8061 9.47667 24 8.00391 24H2.67057C1.19781 24 0.00390625 22.8061 0.00390625 21.3333V16Z'
            fill={color[props.color]}
          />
        </g>
        <defs>
          <clipPath id='clip0_146_1251'>
            <rect width='24' height='24' fill='white' transform='translate(0.00390625)' />
          </clipPath>
        </defs>
      </svg>
    </IconContainer>
  );
};

export default Grid;
