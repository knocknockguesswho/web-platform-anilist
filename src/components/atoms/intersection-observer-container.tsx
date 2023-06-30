import { useIntersectionListener } from 'Helpers/custom-hooks';
import React from 'react';

interface IProps{
  children?: React.ReactNode;
  once?: boolean;
  height?: number;
  placeHolder?: React.ReactElement;
  threshold?: number;
}

function IntersectionObserverContainer(props: IProps): React.ReactElement {
  const [isInView, setIsInView] = React.useState(false);
  const [hasInView, setHasInView] = React.useState(false);
  const threshold = React.useMemo(() => {
    return props.threshold ? props.threshold : 0.5;
  }, [props.threshold]);

  const onIntersectionChange = React.useCallback((inView: boolean) => {
    setIsInView(inView);
  }, []);
  const onIntersectionRatioChange = React.useCallback((value: number) => {
    if (value > threshold) {
      setIsInView(true);
    }
  }, [threshold]);
  const intersectionref = useIntersectionListener({
    onIntersectionChange,
    onIntersectionRatioChange,
    threshold,
  });

  const holderElement = <div className='holder' style={{ height: props.height }}>{props.placeHolder}</div>;
  React.useEffect(() => {
    if (isInView && !hasInView) {
      setHasInView(isInView);
    }
  }, [isInView, hasInView]);

  if (typeof window === 'undefined') {
    return holderElement;
  }

  if (props.once && hasInView) {
    return <>{props.children}</>;
  }
  return <div ref={ intersectionref}>
    {props.once && (typeof window !== 'undefined' && (hasInView) ? props.children : holderElement)}
    {!props.once && (typeof window !== 'undefined' && (isInView) ? props.children : holderElement)}

  </div> ;
}

IntersectionObserverContainer.defaultProps = {
  once: true,
};

export default React.memo(IntersectionObserverContainer);
