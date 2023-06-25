import React, { useContext } from "react";
import { Box, Button, HStack, Image, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { PomodoroContext } from "../contexts/PomodoroProvider";

const Navbar = () => {
  const { step } = useContext(PomodoroContext);

  return (
    <HStack
      width="full"
      p="2"
      justifyContent="space-between"
      alignItems="center"
    >
      <HStack alignItems="center" space="2">
        <Image
          source={{ uri: "https://pomofocus.io/images/icon-white2.png" }}
          alt="Alternate Text"
          size="xs"
        />
        <Text color="white" fontSize="md">
          Pomofocus
        </Text>
      </HStack>
      <Button
        leftIcon={<Ionicons size={16} name="settings" color="white" />}
        size="sm"
        rounded="md"
        backgroundColor={
          step === 1
            ? "pomodorro.light"
            : step === 2
            ? "shortBreak.light"
            : "longBreak.light"
        }
      >
        Setting
      </Button>
    </HStack>
  );
};

export default Navbar;
