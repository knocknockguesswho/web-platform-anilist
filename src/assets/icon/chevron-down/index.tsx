import IconContainer, { IProps } from 'Assets/icon/icon-container';
import { color } from 'Helpers/common-type';

const ChevronDown = (props: IProps) => {
  return (
    <IconContainer {...props}>
      <svg width={props.size} height={props.size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M12 14.2665L21.28 5.35982C21.5643 5.07537 21.8489 5.07537 22.1333 5.35982L23.7867 6.95981C24.0711 7.24427 24.0711 7.5287 23.7867 7.81314L12.4267 18.6931C12.32 18.7998 12.1778 18.8531 12 18.8531C11.8222 18.8531 11.68 18.7998 11.5733 18.6931L0.213333 7.81314C-0.0711111 7.5287 -0.0711111 7.24427 0.213333 6.95981L1.86667 5.35982C2.15111 5.07537 2.43555 5.07537 2.72 5.35982L12 14.2665Z'
          fill={color[props.color]}
        />
      </svg>
    </IconContainer>
  );
};

export default ChevronDown;
