import React, { useContext } from "react";
import { Box, Center, Text, View } from "native-base";
import Pomodoro from "../components/Pomodoro";
import { PomodoroContext } from "../contexts/PomodoroProvider";
import Navbar from "../components/Navbar";

const Main = () => {
  const { step, pomodoroRound, breakRound, progress } =
    useContext(PomodoroContext);

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
      position="relative"
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
      <Center position="absolute" bottom="0" width="full">
        <Box
          position="absolute"
          left="0"
          top="0"
          backgroundColor="black"
          height="0.50"
          width="100%"
        ></Box>
        <Box
          position="absolute"
          left="0"
          top="0"
          backgroundColor="white"
          height="0.50"
          width={progress + "%"}
        ></Box>
        <Navbar />
      </Center>
    </View>
  );
};

export default Main;
