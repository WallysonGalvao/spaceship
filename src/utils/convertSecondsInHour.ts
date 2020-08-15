import * as duration from 'duration-fns';

const convertSecondsInHour = (
  seconds: number,
): { hours: number; minutes: number } => {
  const time = duration.normalize({ seconds });

  const { hours, minutes } = time;

  return { hours, minutes };
};

export default convertSecondsInHour;
