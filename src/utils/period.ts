import { getHours, getMinutes, getSeconds, getMonth } from 'date-fns';
import * as duration from 'duration-fns';

interface Mission {
  id: number;
  name: string;
  color: string;
  time: number;
}

const totalHours = (missions: Mission[]): number => {
  const total = missions
    .filter(mission => mission.time)
    .map(({ time }) => {
      const hours = getHours(time);
      const minutes = getMinutes(time);
      return duration.toSeconds({ hours, minutes });
    })
    .reduce((a, b) => a + b);
  return total;
};

const group = (missions: Mission[]): Mission[] => {
  const missionsName = missions
    .filter((v, i, s) => s.map(x => x.name).indexOf(v.name) === i)
    .map(({ name }) => name)
    .map(name => missions.filter(mission => mission.name === name));

  const monthInMinutes = missionsName.map(mission => {
    return mission
      .map(({ name, color, time }) => {
        const hours = getHours(time);
        const minutes = getMinutes(time);
        const seconds = getSeconds(time);
        const month = getMonth(time);
        return {
          name,
          color,
          month,
          time: duration.toSeconds({ hours, minutes, seconds }),
        };
      })
      .reduce((a, b) => ({
        name: a.name,
        color: a.color,
        month: a.month,
        time: a.time + b.time,
      }));
  });

  const missionsFiltered = monthInMinutes.map(
    ({ name, color, month, time }, index) => {
      const { hours, minutes } = duration.normalize({ seconds: time });

      const dateMo = new Date().setMonth(month);
      const dateHo = new Date(dateMo).setHours(hours);
      const newTime = new Date(dateHo).setMinutes(minutes);

      return {
        id: index,
        name,
        color,
        time: newTime,
      };
    },
  );

  return missionsFiltered;
};

export default { group, totalHours };
