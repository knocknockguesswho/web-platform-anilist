import { IIconContainerProps } from 'Helpers/common-interface';

export interface IProps extends Omit<IIconContainerProps, 'name'> {}
const IconContainer = (props: IProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { color, size, ...args } = props;
  return (
    <div {...args}>
      {props.children}
    </div>
  );
};

export default IconContainer;
