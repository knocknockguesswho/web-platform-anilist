import React from 'react';

interface IIntersectionListener {
  threshold?: number | number[];
  onIntersectionRatioChange?: (intersectionValue: number) => void;
  onIntersectionChange?: (intersection: boolean) => void;
}
export function useIntersectionListener(params: IIntersectionListener) {
  const ref = React.useRef(null);
  const { onIntersectionChange, onIntersectionRatioChange, threshold } = params;
  const [hasIntersection, setHasIntersection] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (typeof window.IntersectionObserver === 'undefined') {
      import('intersection-observer')
        .then(() => setHasIntersection(true));
    } else {
      setHasIntersection(true);
    }
  }, []);

  React.useEffect(() => {
    if (!hasIntersection) {
      return;
    }
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries && entries[0]) {
          if (onIntersectionRatioChange) {
            onIntersectionRatioChange(entries[0]?.intersectionRatio);
          }
          if (onIntersectionChange) {
            onIntersectionChange(entries[0]?.isIntersecting);
          }
        }
      },
      { threshold: threshold },
    );
    if (ref.current) {
      observer.observe((ref.current as unknown) as Element);
    }
    return () => {
      if (ref.current) {
        observer.unobserve((ref.current as unknown) as Element);
      }
    };
  }, [onIntersectionChange, onIntersectionRatioChange, ref.current, threshold]);
  return ref;
}
