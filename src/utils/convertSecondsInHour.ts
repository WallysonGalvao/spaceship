const convertSecondsInHour = (
  seconds: number,
): { hour: number; minutes: number } => {
  const secondsToHours = seconds / 3600;

  let hourParsed = secondsToHours;
  let minParsed = 0;

  if (secondsToHours.toString().includes('.')) {
    const [hour, minutes] = secondsToHours.toString().split('.');

    hourParsed = parseInt(hour, 10);
    minParsed = parseInt(minutes, 10);

    if (minParsed < 10) {
      minParsed = parseInt(`${minParsed}0`, 10);
    }
  }

  return { hour: hourParsed, minutes: minParsed };
};

export default convertSecondsInHour;
