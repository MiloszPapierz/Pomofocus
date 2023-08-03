import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface PomodoroContextProps {
  isRunning: boolean;
  setIsRunning: () => void;
  step: number;
  setStep: (step: number) => void;
  pomodoroTime: number;
  setPomodoroTime: (pomodoroTime: number) => void;
  shortBreakTime: number;
  setShortBreakTime: (shortBreakTime: number) => void;
  longBreakTime: number;
  setLongBreakTime: (longBreakTime: number) => void;
  pomodoroRound: number;
  breakRound: number;
  progress: number;
  setProgress: (progress: number) => void;
  longBreakInterval: number;
  setLongBreakInterval: (interval: number) => void;
  autoStartBreaks: boolean;
  setAutoStartBreaks: (autoBreak: boolean) => void;
  autoStartPomodoros: boolean;
  setAutoStartPomodoros: (autoPomodoro: boolean) => void;
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
  breakRound: 1,
  progress: 0,
  setProgress: () => {},
  longBreakInterval: 4,
  setLongBreakInterval: () => {},
  autoStartBreaks: false,
  setAutoStartBreaks: () => {},
  autoStartPomodoros: false,
  setAutoStartPomodoros: () => {},
};

const PomodoroContext = createContext<PomodoroContextProps>(
  defaultPomodoroContext
);

const PomodoroProvider = ({ children }: Props) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [pomodoroTime, setPomodoroTime] = useState<number>(1);
  const [shortBreakTime, setShortBreakTime] = useState<number>(25);
  const [longBreakTime, setLongBreakTime] = useState<number>(15);
  const [pomodoroRound, setPomodoroRound] = useState<number>(1);
  const [breakRound, setBreakRound] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [longBreakInterval, setLongBreakInterval] = useState<number>(4);
  const [autoStartBreaks, setAutoStartBreaks] = useState<boolean>(false);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState<boolean>(false);

  const handleSetStep = (newStep: number) => {
    if (!(newStep < 1 || newStep > 3)) {
      setStep(newStep);
      if (newStep === 2 || newStep === 3) {
        setPomodoroRound((rounds) => rounds + 1);
      } else {
        setBreakRound((rounds) => rounds + 1);
      }
    }
  };

  const handleIsRunning = () => {
    setIsRunning((running) => !running);
  };

  const handleSetProgress = (progress: number) => {
    setProgress(progress);
  };

  const pomodoroContextValue: PomodoroContextProps = {
    isRunning,
    setIsRunning: handleIsRunning,
    step,
    setStep: handleSetStep,
    pomodoroTime,
    setPomodoroTime,
    shortBreakTime,
    setShortBreakTime,
    longBreakTime,
    setLongBreakTime,
    pomodoroRound,
    breakRound,
    progress,
    setProgress: handleSetProgress,
    longBreakInterval,
    setLongBreakInterval,
    autoStartBreaks,
    setAutoStartBreaks,
    autoStartPomodoros,
    setAutoStartPomodoros,
  };

  return (
    <PomodoroContext.Provider value={pomodoroContextValue}>
      {children}
    </PomodoroContext.Provider>
  );
};

export { PomodoroContext, PomodoroProvider };
