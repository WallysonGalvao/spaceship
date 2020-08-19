import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  addMinutes,
  isSameYear,
  isSameMonth,
  isSameDay,
  startOfDay,
} from 'date-fns';

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
    const parsed = JSON.parse(response);
    if (parsed) {
      if (parsed.length > 0) {
        setMissions(parsed);
      } else {
        setMissions(missionsMock);
        await AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(missionsMock));
      }
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const updateMissionTime = useCallback(
    ({ name, timer }: { name: string; timer: number }) => {
      const currentDate = startOfDay(new Date());

      const sameName = missions.filter(
        mission => mission.name.toLowerCase() === name.toLowerCase(),
      );

      const sameDay = sameName
        .filter(mission =>
          isSameMonth(startOfDay(new Date(mission.time)), currentDate),
        )
        .filter(mission =>
          isSameDay(startOfDay(new Date(mission.time)), currentDate),
        )
        .filter(mission =>
          isSameYear(startOfDay(new Date(mission.time)), currentDate),
        );

      if (sameDay.length > 0) {
        const updateMissionTimes = [...missions];
        const missionToUpdate = sameDay[0];

        const date = new Date(missionToUpdate.time);
        const dateWIthMinutesAdd = addMinutes(new Date(date), timer);
        missionToUpdate.time = dateWIthMinutesAdd.getTime();

        setMissions(updateMissionTimes);
      } else {
        const currentMission = missions.find(
          mission => mission.name.toLowerCase() === name.toLowerCase(),
        );

        if (currentMission) {
          const addNewMission = { ...currentMission };
          addNewMission.id = missions.length + 1;
          addNewMission.time = new Date(currentDate).setMinutes(30);
          const addMission = [...missions, addNewMission];
          setMissions(addMission);
        }
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
