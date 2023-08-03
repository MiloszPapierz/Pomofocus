import React, { useContext } from "react";
import { HStack, Box, Text, VStack, Button } from "native-base";
import PomodoroItem from "./PomodoroItem";
import Timer from "./Timer";
import { PomodoroContext } from "../contexts/PomodoroProvider";
import { ResolveColor } from "../utils/StepToColorConverter";

const items = ["Pomodoro", "Short Break", "Long Break"];

const Pomodoro = () => {
  const { step, isRunning, setIsRunning } = useContext(PomodoroContext);

  return (
    <Box p="4">
      <VStack alignItems="center" space="4">
        <HStack justifyContent="center" space="3">
          {items.map((item, index) => {
            return (
              <PomodoroItem
                key={index}
                text={item}
                active={index === step - 1 ? true : false}
                index={index}
              />
            );
          })}
        </HStack>
        <Timer />
        <Button
          width="4/5"
          backgroundColor="white"
          onPress={() => {
            setIsRunning(!isRunning);
          }}
        >
          <Text color={ResolveColor(step)} fontSize="2xl">
            {isRunning ? "STOP" : "START"}
          </Text>
        </Button>
      </VStack>
    </Box>
  );
};

export default Pomodoro;
