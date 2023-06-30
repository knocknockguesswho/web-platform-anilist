import React from 'react';
import Image from 'Components/atoms/image';
import { IAnilistMedia } from 'Helpers/interfaces/anilist-media';
import { emptyImage } from 'Assets/constant/data';

interface IProps {
  item?: IAnilistMedia
  isLoading?: boolean;
  isPrioritized?: boolean;
}

const LoadingElement = () => {
  return (
    <div className='flex flex-col items-center space-y-2'>
      <div className='rounded w-[150px] phone:w-[180px] desktop:w-[213px] aspect-[0.71] skeleton' />
      <div className='flex flex-col space-y-1 items-center'>
        <div className='h-4 w-28 skeleton' />
        <div className='h-4 w-20 skeleton' />
      </div>
    </div>
  );
};

const CardMedia = (props: IProps) => {
  return props.isLoading
    ? <LoadingElement />
    : (
      <div
        id='card-media-container'
        title={props.item?.title?.userPreferred}
        className='flex flex-col text-center space-y-2 transition-all w-[150px] phone:w-[180px] desktop:w-[213px]'>
        <div
          id='card-media-image-container'
          className='w-full aspect-[0.71] overflow-hidden relative rounded shadow-card'
          style={{ background: props.item?.coverImage?.color }}>
          <Image
            width={213}
            height={300}
            src={props.item?.coverImage?.large ?? emptyImage.cover}
            alt='Media Cover Image'
            placeholder='blur'
            objectFit='cover'
            className='w-full aspect-[0.71]'
            priority={props.isPrioritized}
            loading={props.isPrioritized ? undefined : 'lazy'}
          />
          <span className='flex text-xs p-1 bg-black/50 rounded text-white absolute top-1 left-1 text-center small-desktop:text-sm small-desktop:top-2 small-desktop:left-2'>
            {props.item?.averageScore ? <>Score:&nbsp;<strong>{props.item?.averageScore}</strong></> : 'No Score'}
          </span>
        </div>
        <span className='line-clamp-2 font-medium leading-tight small-desktop:text-lg'>{props.item?.title?.userPreferred}</span>
      </div>
    );
};

export default CardMedia;
