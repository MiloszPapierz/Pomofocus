import React, { useState, useEffect, useContext } from "react";
import { Text } from "native-base";
import { PomodoroContext } from "../contexts/PomodoroProvider";
import { calculateTimerProgress } from "../utils/TimerProgress";

const Timer = () => {
  const {
    isRunning,
    step,
    setStep,
    pomodoroTime,
    longBreakTime,
    shortBreakTime,
    pomodoroRound,
    setProgress,
  } = useContext(PomodoroContext);
  const [minutes, setMinutes] = useState<number>(
    step === 1 ? pomodoroTime : step === 2 ? shortBreakTime : longBreakTime
  );
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    setMinutes(
      step === 1 ? pomodoroTime : step === 2 ? shortBreakTime : longBreakTime
    );
    setSeconds(0);
  }, [step]);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (isRunning) {
      interval = setInterval(() => {
        seconds > 0 ? setSeconds((seconds) => seconds - 1) : null;

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            if (step === 1) {
              if (pomodoroRound % 4 === 0) {
                setStep(3);
              } else {
                setStep(2);
              }
            } else {
              setStep(1);
            }
          } else {
            setMinutes((minutes) => minutes - 1);
            setSeconds(59);
          }
        }
        setProgress(
          calculateTimerProgress(
            step === 1
              ? pomodoroTime
              : step === 2
              ? shortBreakTime
              : longBreakTime,
            minutes,
            seconds
          )
        );
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning, minutes, seconds]);

  return (
    <Text
      textAlign="center"
      fontWeight="bold"
      color="white"
      fontSize="6xl"
      letterSpacing="md"
    >
      {minutes < 10 ? "0" + minutes : minutes} :{" "}
      {seconds < 10 ? "0" + seconds : seconds}
    </Text>
  );
};

export default Timer;
