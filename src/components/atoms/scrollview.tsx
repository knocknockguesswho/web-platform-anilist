import React from 'react';

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  withShadow?: boolean;
  withScrollIndicator?: boolean;
  getDragStatus?: (drag: boolean) => void;
  isClickableContent?: boolean;
}
const Scrollview = (props: IProps) => {
  const dragContainer: React.LegacyRef<HTMLDivElement> = React.useRef(null);
  const [distance, setDistance] = React.useState(0);
  const [isClicked, setisClicked] = React.useState(false);
  const [anchorPoint, setAnchorPoint] = React.useState(0);
  const [scrollDiff, setScrollDiff] = React.useState(0); // use it to allow scroll shadow
  const [scrollValue, setScrollValue] = React.useState(0);

  React.useLayoutEffect(() => {
    if (dragContainer.current) {
      setScrollDiff(dragContainer.current.scrollWidth - dragContainer.current.clientWidth);
      setScrollValue((scrollDiff - dragContainer.current.scrollLeft) / scrollDiff);
    }
  }, [dragContainer, scrollDiff]);
  return (
    <div className='relative py-1'>
      {props.withShadow &&
        <React.Fragment>
          <div className='scrollview-shadow scrollview-shadow-left' style={{ opacity: scrollDiff > 0 ? Math.abs(scrollValue - 1) : 0 }} />
          <div className='scrollview-shadow scrollview-shadow-right' style={{ opacity: scrollValue }} />
        </React.Fragment>
      }
      <div
        onMouseDown={(e) => {
          if (dragContainer.current) {
            e.preventDefault();
            e.stopPropagation();
            setisClicked(true);
            setAnchorPoint(e.pageX - dragContainer.current.offsetLeft);
            setDistance(dragContainer.current.scrollLeft);
            dragContainer.current.style.cursor = 'grabbing';
            setScrollValue((scrollDiff - dragContainer.current.scrollLeft) / scrollDiff);
          }
        }}
        onMouseUp={(e) => {
          if (dragContainer.current) {
            e.preventDefault();
            e.stopPropagation();
            setisClicked(false);
            dragContainer.current.style.cursor = props.isClickableContent ? 'pointer' : 'auto';
            const dragTimeout = setTimeout(() => {
              props.getDragStatus && props.getDragStatus(false);
            }, 50);
            return () => clearTimeout(dragTimeout);
          }
        }}
        onMouseLeave={(e) => {
          if (dragContainer.current) {
            e.preventDefault();
            e.stopPropagation();
            setisClicked(false);
          }
        }}
        onMouseMove={(e) => {
          if (dragContainer.current) {
            if (!isClicked) return;
            e.preventDefault();
            e.stopPropagation();
            dragContainer.current.style.cursor = 'grabbing';
            const moveValue = e.pageX - dragContainer.current.offsetLeft;
            const dragValue = moveValue - anchorPoint;
            dragContainer.current.scrollLeft = distance - dragValue;
            Math.abs(dragValue) > 5 && props.getDragStatus && props.getDragStatus(true);
            setScrollValue((scrollDiff - dragContainer.current.scrollLeft) / scrollDiff);
          }
        }}
        onMouseOver={() => {
          if (dragContainer.current) dragContainer.current.style.cursor = props.isClickableContent ? 'pointer' : 'auto';
        }}
        onWheel={() => {
          if (dragContainer.current) setScrollValue((scrollDiff - dragContainer.current.scrollLeft) / scrollDiff);
        }}
        ref={dragContainer}
        className={[
          'w-full select-none h-full overflow-x-auto',
          !props.withScrollIndicator ? 'scroll-hide' : '',
        ].join(' ').trim()}
        style={props.style}>
        <ul className={['w-full h-full flex flex-row', props.className].join(' ').trim()}>
          {props.children}
        </ul>
      </div>
    </div>
  );
};
export default Scrollview;
