import React from 'react';
import DOMPurify from 'isomorphic-dompurify';

const allowedAttr: {[key: string]: string[]} = {
  'iframe': ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
};

interface IDangerouslySetInnerHtml {
  data: string;
  className?: string;
  draggable?: boolean;
  id?: string;
  style?: React.CSSProperties;
  allowedTags?: string[];
}

const DomPurifyContainer = (props: IDangerouslySetInnerHtml) => {
  let attr: string[] = [];
  props.allowedTags && props.allowedTags.map((allowedTag) => {
    attr = attr.concat(allowedAttr[allowedTag]);
  });
  const config = { ADD_TAGS: props.allowedTags, ADD_ATTR: attr };
  return (
    <div
      className={props.className}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.data, config) }}
      draggable={props.draggable}
      id={props.id}
      style={props.style}
    />
  );
};

DomPurifyContainer.defaultProps = {
  // draggable: true,
  data: '<></>',
};

export default DomPurifyContainer;
