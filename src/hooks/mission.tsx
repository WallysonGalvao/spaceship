import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { addMinutes, getTime } from 'date-fns';

import missionsMock from '../res/missions';

export interface Mission {
  id: number;
  name: string;
  time: number;
  color: string;
}

interface MissionContextData {
  missions: Mission[];

  updateMissionTime({ name, timer }: { name: string; timer: number }): void;
}

const MissionContext = createContext<MissionContextData>(
  {} as MissionContextData,
);

const STORAGE_NAME = '@spaceship:missions';

export const MissionProvider: React.FC = ({ children }) => {
  const [missions, setMissions] = useState<Mission[]>([]);

  async function loadData(): Promise<void> {
    const response = await AsyncStorage.getItem(STORAGE_NAME);
    // console.log(`${STORAGE_NAME} ${JSON.stringify(response)}`);
    /**
     * TODO: Filtrar missões pelo id do user
     */
    if (response && response.length > 0) {
      setMissions(JSON.parse(response));
    } else {
      setMissions(missionsMock);
      await AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(missionsMock));
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const updateMissionTime = useCallback(
    ({ name, timer }: { name: string; timer: number }) => {
      const index = missions.findIndex(
        mission =>
          mission.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
      );

      if (index >= 0 && timer) {
        const updateMissionTimes = [...missions];

        // Trocar esse 30 por timer
        const currentMission = updateMissionTimes[index];

        const result = addMinutes(currentMission.time, timer);
        currentMission.time = getTime(result);
        console.log(`currentMission ${JSON.stringify(currentMission)}`);
        setMissions(updateMissionTimes);
      }

      AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(missions));
    },
    [missions],
  );

  return (
    <MissionContext.Provider value={{ missions, updateMissionTime }}>
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
