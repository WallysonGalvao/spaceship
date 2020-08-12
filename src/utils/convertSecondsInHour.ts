const convertSecondsInHour = (
  seconds: number,
): { hour: string; minutes: string } => {
  const secondsToHours = seconds / 3600;
  const [hour, minutes] = secondsToHours.toString().split('.');
  return { hour, minutes };
};

export default convertSecondsInHour;
