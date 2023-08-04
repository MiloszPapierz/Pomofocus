import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SettingType } from "../types/setting";

interface Props {
  children: React.ReactNode;
}

interface PomodoroContextProps {
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  step: number;
  setStep: (step: number) => void;
  pomodoroTime: number;
  setPomodoroTime: (pomodoroTime: number) => void;
  shortBreakTime: number;
  setShortBreakTime: (shortBreakTime: number) => void;
  longBreakTime: number;
  setLongBreakTime: (longBreakTime: number) => void;
  pomodoroRound: number;
  setPomodoroRound: (pomodoroRound: number) => void;
  breakRound: number;
  setBreakRound: (breakRound: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
  longBreakInterval: number;
  setLongBreakInterval: (interval: number) => void;
  autoStartBreaks: boolean;
  setAutoStartBreaks: (autoBreak: boolean) => void;
  autoStartPomodoros: boolean;
  setAutoStartPomodoros: (autoPomodoro: boolean) => void;
  updateSettings: (newSettings: SettingType) => void;
}

const defaultPomodoroContext: PomodoroContextProps = {
  isRunning: false,
  setIsRunning: () => {},
  step: 1,
  setStep: () => {},
  pomodoroTime: 25,
  setPomodoroTime: () => {},
  shortBreakTime: 5,
  setShortBreakTime: () => {},
  longBreakTime: 15,
  setLongBreakTime: () => {},
  pomodoroRound: 1,
  setPomodoroRound: () => {},
  breakRound: 1,
  setBreakRound: () => {},
  progress: 0,
  setProgress: () => {},
  longBreakInterval: 4,
  setLongBreakInterval: () => {},
  autoStartBreaks: false,
  setAutoStartBreaks: () => {},
  autoStartPomodoros: false,
  setAutoStartPomodoros: () => {},
  updateSettings: () => {},
};

const PomodoroContext = createContext<PomodoroContextProps>(
  defaultPomodoroContext
);

const PomodoroProvider = ({ children }: Props) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [pomodoroTime, setPomodoroTime] = useState<number>(30);
  const [shortBreakTime, setShortBreakTime] = useState<number>(5);
  const [longBreakTime, setLongBreakTime] = useState<number>(15);
  const [pomodoroRound, setPomodoroRound] = useState<number>(1);
  const [breakRound, setBreakRound] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [longBreakInterval, setLongBreakInterval] = useState<number>(4);
  const [autoStartBreaks, setAutoStartBreaks] = useState<boolean>(false);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState<boolean>(false);

  const handleSetStep = (newStep: number) => {
    if (newStep < 1 && newStep > 3) return;

    setStep(newStep);
  };

  const updateSettings = async (newSettings: SettingType) => {
    try {
      await AsyncStorage.setItem("SettingOptions", JSON.stringify(newSettings));
      setPomodoroTime(newSettings.pomodoro);
      setShortBreakTime(newSettings.shortBreak);
      setLongBreakTime(newSettings.longBreak);
      setLongBreakInterval(newSettings.longBreakInterval);
      setAutoStartBreaks(newSettings.autoStartBreaks);
      setAutoStartPomodoros(newSettings.autoStartPomodoros);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getDataFromStorage = async () => {
      try {
        const data = await AsyncStorage.getItem("SettingOptions");

        if (data === null) {
          const defaultSettings: SettingType = {
            autoStartBreaks,
            autoStartPomodoros,
            longBreakInterval,
            longBreak: longBreakTime,
            shortBreak: shortBreakTime,
            pomodoro: pomodoroTime,
          };
          await AsyncStorage.setItem(
            "SettingOptions",
            JSON.stringify(defaultSettings)
          );
        } else {
          const persistedData = JSON.parse(data) as SettingType;
          setPomodoroTime(persistedData.pomodoro);
          setShortBreakTime(persistedData.shortBreak);
          setLongBreakTime(persistedData.longBreak);
          setLongBreakInterval(persistedData.longBreakInterval);
          setAutoStartBreaks(persistedData.autoStartBreaks);
          setAutoStartPomodoros(persistedData.autoStartPomodoros);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getDataFromStorage();
  }, []);

  const pomodoroContextValue: PomodoroContextProps = {
    isRunning,
    setIsRunning,
    step,
    setStep: handleSetStep,
    pomodoroTime,
    setPomodoroTime,
    shortBreakTime,
    setShortBreakTime,
    longBreakTime,
    setLongBreakTime,
    pomodoroRound,
    setPomodoroRound,
    breakRound,
    setBreakRound,
    progress,
    setProgress,
    longBreakInterval,
    setLongBreakInterval,
    autoStartBreaks,
    setAutoStartBreaks,
    autoStartPomodoros,
    setAutoStartPomodoros,
    updateSettings,
  };

  return (
    <PomodoroContext.Provider value={pomodoroContextValue}>
      {children}
    </PomodoroContext.Provider>
  );
};

export { PomodoroContext, PomodoroProvider };
