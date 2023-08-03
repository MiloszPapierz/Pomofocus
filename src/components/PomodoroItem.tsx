import React, { useContext } from "react";
import { Box, Pressable, Text } from "native-base";
import { PomodoroContext } from "../contexts/PomodoroProvider";
import { ResolveColor } from "../utils/StepToColorConverter";

interface Props {
  text: string;
  active: boolean;
  index: number;
}

const PomodoroItem = ({ text, active, index }: Props) => {
  const { step, setStep } = useContext(PomodoroContext);

  const handleStepPress = () => {
    setStep(index + 1);
  };

  return (
    <Pressable onPress={handleStepPress}>
      <Box
        backgroundColor={active ? ResolveColor(step) : null}
        p="1"
        rounded="sm"
      >
        <Text color="white" fontWeight={active ? "bold" : null} fontSize="md">
          {text}
        </Text>
      </Box>
    </Pressable>
  );
};

export default PomodoroItem;
