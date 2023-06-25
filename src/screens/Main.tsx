import React, { useContext } from "react";
import { Center, Text, View } from "native-base";
import Pomodoro from "../components/Pomodoro";
import { PomodoroContext } from "../contexts/PomodoroProvider";

const Main = () => {
  const { step, pomodoroRound, breakRound } = useContext(PomodoroContext);

  return (
    <View
      backgroundColor={
        step === 1
          ? "pomodorro.medium"
          : step === 2
          ? "shortBreak.medium"
          : "longBreak.medium"
      }
      justifyContent="center"
      display="flex"
      height="full"
    >
      <Center
        mx="8"
        rounded="md"
        backgroundColor={
          step === 1
            ? "pomodorro.light"
            : step === 2
            ? "shortBreak.light"
            : "longBreak.light"
        }
      >
        <Pomodoro />
      </Center>
      <Center mt="4">
        <Text color="additional.medium" fontSize="md">
          #{step === 1 ? pomodoroRound : breakRound}
        </Text>
        <Text color="white" fontSize="md">
          {step === 1 ? "Time to focus!" : "Time for a break!"}
        </Text>
      </Center>
    </View>
  );
};

export default Main;
