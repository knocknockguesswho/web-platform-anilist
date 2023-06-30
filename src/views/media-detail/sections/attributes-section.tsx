import React from 'react';
import { IAnilistMedia } from 'Helpers/interfaces/anilist-media';
import { convertToCurrency } from 'Helpers/common-helper';

interface IProps {
  data: IAnilistMedia;
}

const AttributeContainer: React.FC<{title: string; description?: React.ReactNode}> = ({ title, description }) => {
  return (
    <div className='w-full flex flex-col'>
      <h4 className='font-bold'>{title}</h4>
      <span>{description}</span>
    </div>
  );
};

const AttributesSection = (props: IProps) => {
  return (
    <section id='media-detail-attributes' className='flex flex-col px-4 space-y-4'>
      <h2 className='font-bold'>Attributes</h2>
      <div id='attributes-item-container' className='p-2 bg-slate-100 space-y-2 shadow-md shadow-slate-500/20'>
        <AttributeContainer title='Average Score' description={props.data.averageScore ? `${props.data.averageScore}%` : 'No Score'} />
        <AttributeContainer title='Mean Score' description={props.data.meanScore ? `${props.data.meanScore}%` : 'No Score'} />
        <AttributeContainer title='Format' description={`${props.data.format}`} />
        {props.data.season && <AttributeContainer title='Season' description={`${props.data.season} ${props.data.seasonYear}`} />}
        {props.data.startDate && <AttributeContainer title='Start Date' description={`${new Date(`${props.data.startDate.year}-${props.data.startDate.month}-${props.data.startDate.day}`).toDateString()}`} />}
        {props.data.favourites && <AttributeContainer title='Favourites' description={`${convertToCurrency(props.data.favourites as number)}`} />}
        <AttributeContainer title='Status' description={`${props.data.status}`} />
        <AttributeContainer title='Hastag' description={`${props.data.hashtag}`} />
        <AttributeContainer title='Synonyms' description={props.data.synonyms?.map((item, idx) => React.createElement('p', { key: idx }, item))} />
      </div>
    </section>
  );
};

export default AttributesSection;
