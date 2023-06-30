import IconContainer, { IProps } from 'Assets/icon/icon-container';
import { color } from 'Helpers/common-type';

const ChevronUp = (props: IProps) => {
  return (
    <IconContainer {...props}>
      <svg width={props.size} height={props.size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M12 9.73314L2.72 18.6398C2.43555 18.9243 2.15111 18.9243 1.86667 18.6398L0.213333 17.0398C-0.0711111 16.7554 -0.0711111 16.4709 0.213333 16.1865L11.5733 5.30648C11.68 5.19982 11.8222 5.14648 12 5.14648C12.1778 5.14648 12.32 5.19982 12.4267 5.30648L23.7867 16.1865C24.0711 16.4709 24.0711 16.7554 23.7867 17.0398L22.1333 18.6398C21.8489 18.9243 21.5643 18.9243 21.28 18.6398L12 9.73314Z'
          fill={color[props.color]}
        />
      </svg>
    </IconContainer>
  );
};

export default ChevronUp;
