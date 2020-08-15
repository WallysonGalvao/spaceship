import React, { RefObject, createRef, useEffect, useMemo } from 'react';
import { Easing } from 'react-native';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Venus from '~/assets/planets/venus.svg';

interface Props {
  timer: number | null;
}

const New: React.FC<Props> = ({ timer }) => {
  const circularProgressRef: RefObject<AnimatedCircularProgress> = createRef();

  const timing = useMemo(() => {
    if (timer) return timer * 60000;
    return 0;
  }, [timer]);

  useEffect(() => {
    if (circularProgressRef.current) {
      circularProgressRef.current.animate(100, timing, Easing.quad);
    }
  }, [circularProgressRef, timing]);

  return (
    <AnimatedCircularProgress
      ref={circularProgressRef}
      size={300}
      width={15}
      backgroundWidth={15}
      fill={0}
      tintColor="#EE5F40"
      tintColorSecondary="#CE2949"
      backgroundColor="#302B4E"
      arcSweepAngle={360}
      rotation={240}
    >
      {() => <Venus width={180} height={180} />}
    </AnimatedCircularProgress>
  );
};

export default New;
