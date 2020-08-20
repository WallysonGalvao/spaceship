import * as duration from 'duration-fns';

const convertSecondsInHour = (
  seconds: number,
): { days: number; hours: number; minutes: number } => {
  const time = duration.normalize({ seconds });

  const { days, hours, minutes } = time;

  return { days, hours, minutes };
};

export default convertSecondsInHour;
