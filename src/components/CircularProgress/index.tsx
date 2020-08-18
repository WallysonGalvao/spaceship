import React, {
  RefObject,
  createRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Easing } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import PlanetIcon from '~/components/PlanetIcon';

import { useUser } from '~/hooks/user';

interface Props {
  timer: number | null;
}

const CircularProgress: React.FC<Props> = ({ timer }) => {
  const { user, updateCredits } = useUser();
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

  const completed = useCallback(
    ({ finished }) => {
      if (finished) {
        updateCredits(timer || 0);
      }
    },
    [timer, updateCredits],
  );

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
      onAnimationComplete={completed}
    >
      {() => <PlanetIcon icon={user.myPlanet || 'sun'} dimension={180} />}
    </AnimatedCircularProgress>
  );
};

export default CircularProgress;
