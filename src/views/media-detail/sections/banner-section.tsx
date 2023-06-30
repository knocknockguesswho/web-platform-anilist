import React from 'react';
import Image from 'Components/atoms/image';
import { IAnilistMedia } from 'Helpers/interfaces/anilist-media';
import { convertToCurrency } from 'Helpers/common-helper';
import { emptyImage } from 'Assets/constant/data';

interface IProps {
  averageScore?: IAnilistMedia['averageScore'];
  popularity?: IAnilistMedia['popularity'];
  bannerImage?: IAnilistMedia['bannerImage'];
}

const BannerSection = (props: IProps) => {
  return (
    <section id='media-detail-banner' className='w-full'>
      <div className='w-full aspect-[2/1] desktop:aspect-[3.6] relative'>
        <Image
          src={props.bannerImage ?? emptyImage.banner}
          alt='Banner Image'
          width={720}
          height={200}
          priority={true}
          placeholder='blur'
          className='w-full aspect-[2/1] desktop:aspect-[3.6]'
          objectFit='cover'
        />
        <div className='absolute inset-0 w-full h-full fog-black-soft' />
        <div className='absolute bottom-0 w-full h-full flex flex-row space-x-2 items-start p-4'>
          <div>
            <span className='bg-black/50 text-white text-xs p-2 rounded'>
              Score:&nbsp;<strong>{props.averageScore}</strong>
            </span>
          </div>
          {props.popularity && <div>
            <span className='bg-green-500/75 text-white text-xs p-2 rounded'>
              Popularity:&nbsp;<strong>{convertToCurrency(props.popularity)}</strong>
            </span>
          </div>}
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
