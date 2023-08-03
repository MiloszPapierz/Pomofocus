import { Button, Divider, HStack, Modal, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import SettingForm from "./SettingForm";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalComponent = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Modal isOpen={isOpen}>
      <Modal.Content width="full">
        <Modal.CloseButton
          onPress={() => {
            setIsOpen(false);
          }}
        />
        <Modal.Header>Setting</Modal.Header>
        <Modal.Body>
          <HStack space={3} alignItems="center">
            <AntDesign name="clockcircleo" size={19} color="black" />
            <Text color="additional.medium" letterSpacing="lg">
              TIMER
            </Text>
          </HStack>
          <Divider thickness="0" my="2" />
          <Text fontWeight="bold">Time (minutes)</Text>
          <SettingForm />
        </Modal.Body>
        <Modal.Footer>
          <Button>Ok</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ModalComponent;
