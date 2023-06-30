import React from 'react';
import NextImage, { ImageLoader } from 'next/image';
import { forceHttp } from 'Helpers/validation';
import { SafeNumber } from 'Helpers/common-type';
import { blurCode } from 'Assets/constant/data';

export interface IProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  src: string;
  alt: string;
  width: SafeNumber;
  height: SafeNumber;
  placeholder?: 'blur' | 'empty';
  blurColor?: 'grey';
  priority?: boolean;
  objectFit?: React.CSSProperties['objectFit']
  objectPosition?: React.CSSProperties['objectPosition'];
  sizes?: string;
  quality?: number;
  loading?: 'lazy' | 'eager'
  draggable?: boolean;
  unoptimized?: boolean;
  loader?: ImageLoader;
}

const Image = (props: IProps) => {

  return (
    <NextImage
      id={props.id}
      src={forceHttp(props.src, blurCode[props.blurColor || 'grey'])}
      alt={props.alt}
      width={props.width}
      height={props.height}
      placeholder={props.placeholder}
      blurDataURL={blurCode[props.blurColor || 'grey']}
      priority={props.priority}
      sizes={props.sizes}
      quality={props.quality}
      loading={props.loading}
      className={props.className}
      style={{
        ...props.style,
        objectPosition: props.objectPosition,
        objectFit: props.objectFit,
      }}
      draggable={props.draggable}
      unoptimized={props.unoptimized}
      loader={props.loader}
    />
  );
};
Image.defaultProps = {
  placeholder: 'empty',
  blurColor: 'grey',
  objectPosition: 'center',
  objectFit: 'contain',
};
export default Image;
