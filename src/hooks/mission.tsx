import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

// import missionsMock from '../res/missions';

interface Mission {
  name: string;
  time: number;
  circle: boolean;
  circleColor: string;
}

interface TotalMissionsHour {
  name: string;
  time: number;
}

interface CompletedMissions {
  name: string;
  total: number;
}

interface MissionContextData {
  missions: Mission[];
  totalMissionsHours: TotalMissionsHour;
  completedMissions: CompletedMissions;
  updateMissionTime({ name, timer }: { name: string; timer: number }): void;
}

const MissionContext = createContext<MissionContextData>(
  {} as MissionContextData,
);

const STORAGE_NAME = '@spaceship:missions';
const MINUTES_IN_SECONDS = 60;

export const MissionProvider: React.FC = ({ children }) => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [totalMissionsHours, setTotalMissionsHours] = useState<
    TotalMissionsHour
  >({ name: 'Tempo total', time: 0 } as TotalMissionsHour);
  const [completedMissions, setCompletedMissions] = useState<CompletedMissions>(
    { name: 'Missões concluídas', total: 0 } as CompletedMissions,
  );

  async function loadData(): Promise<void> {
    const response = await AsyncStorage.getItem(STORAGE_NAME);

    if (response && response.length > 0) {
      setMissions(JSON.parse(response));
    } else {
      await AsyncStorage.setItem(STORAGE_NAME, JSON.stringify([]));
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const updateTime = useCallback((currentMission, timer) => {
    // Atualizar as horas da missão
    const current = currentMission;

    const minutesInSeconds = timer * MINUTES_IN_SECONDS;

    const timeToAdd = current.time + minutesInSeconds;

    current.time = timeToAdd;

    return current;
  }, []);

  const updateMissionTime = useCallback(
    ({ name, timer }: { name: string; timer: number }) => {
      const index = missions.findIndex(
        mission =>
          mission.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
      );

      if (index >= 0 && timer) {
        const updateMissionTimes = [...missions];

        // Updates the hours of the selected mission
        updateTime(updateMissionTimes[index], timer);
        setMissions(updateMissionTimes);

        // Updates total time with all missions
        const allHours = updateMissionTimes
          .filter(mission => mission.time)
          .map(({ time }) => ({ time }))
          .reduce((a, b) => ({
            time: a.time + b.time,
          }));

        setTotalMissionsHours({
          ...totalMissionsHours,
          ...allHours,
        });

        // Updates number of completed missions
        setCompletedMissions({
          ...completedMissions,
          total: updateMissionTimes.length,
        });
      }

      AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(missions));
    },
    [missions, totalMissionsHours, completedMissions, updateTime],
  );

  return (
    <MissionContext.Provider
      value={{
        missions,
        totalMissionsHours,
        completedMissions,
        updateMissionTime,
      }}
    >
      {children}
    </MissionContext.Provider>
  );
};

export function useMission(): MissionContextData {
  const context = useContext(MissionContext);

  if (!context)
    throw new Error('useMission must be used within an MissionProvider');

  return context;
}
