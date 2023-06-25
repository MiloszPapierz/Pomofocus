import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface PomodoroContextProps {
  isRunning: boolean;
  step: number;
  setStep: (step: number) => void;
  setIsRunning: () => void;
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  pomodoroRound: number;
  breakRound: number;
  progress: number;
  setProgress: (progress: number) => void;
}

const defaultPomodoroContext: PomodoroContextProps = {
  isRunning: false,
  step: 1,
  setStep: () => {},
  setIsRunning: () => {},
  pomodoroTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  pomodoroRound: 1,
  breakRound: 1,
  progress: 0,
  setProgress: (progress: number) => {},
};

const PomodoroContext = createContext<PomodoroContextProps>(
  defaultPomodoroContext
);

const PomodoroProvider = ({ children }: Props) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [pomodoroTime, setPomodoroTime] = useState<number>(1);
  const [shortBreakTime, setShortBreakTime] = useState<number>(5);
  const [longBreakTime, setLongBreakTime] = useState<number>(15);
  const [pomodoroRound, setPomodoroRound] = useState<number>(1);
  const [breakRound, setBreakRound] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);

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
    step,
    setStep: handleSetStep,
    setIsRunning: handleIsRunning,
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
    pomodoroRound,
    breakRound,
    progress,
    setProgress: handleSetProgress,
  };

  return (
    <PomodoroContext.Provider value={pomodoroContextValue}>
      {children}
    </PomodoroContext.Provider>
  );
};

export { PomodoroContext, PomodoroProvider };
