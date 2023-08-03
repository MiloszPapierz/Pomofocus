import { Button, Modal, Text } from "native-base";
import SettingForm from "./form/SettingForm";

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
        <Modal.Header>
          <Text fontWeight="bold" fontSize="md" color="additional.dark">
            Setting
          </Text>
        </Modal.Header>
        <Modal.Body>
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
