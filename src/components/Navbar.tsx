import React, { useContext, useState } from "react";
import { Box, Button, HStack, Image, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { PomodoroContext } from "../contexts/PomodoroProvider";
import ModalComponent from "./Modal";
import { ResolveColor } from "../utils/StepToColorConverter";

const Navbar = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);
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
      <Box>
        <Button
          leftIcon={<Ionicons size={16} name="settings" color="white" />}
          size="sm"
          rounded="md"
          onPress={() => {
            setIsModalVisible(true);
          }}
          backgroundColor={ResolveColor(step)}
        >
          Setting
        </Button>
        <ModalComponent isOpen={isModalVisible} setIsOpen={setIsModalVisible} />
      </Box>
    </HStack>
  );
};

export default Navbar;
