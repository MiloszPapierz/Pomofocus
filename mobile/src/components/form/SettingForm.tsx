import { Formik } from "formik";
import { SettingType, settingSchema } from "../../types/setting";
import { Box, Button, HStack, Input, Switch, Text, VStack } from "native-base";
import { ReactNode, useContext } from "react";
import { PomodoroContext } from "../../contexts/PomodoroProvider";
import FormSection from "./FormSection";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  setIsOpen: (isOpen: boolean) => void;
}

const SettingForm = ({ setIsOpen }: Props) => {
  const {
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
    longBreakInterval,
    autoStartPomodoros,
    autoStartBreaks,
    updateSettings,
  } = useContext(PomodoroContext);

  const handleNumberInput = (value: string) => {
    const numericValue = parseInt(value);

    if (!numericValue) return "";

    return numericValue;
  };

  const initial: SettingType = {
    autoStartBreaks: autoStartBreaks,
    autoStartPomodoros: autoStartPomodoros,
    longBreak: longBreakTime,
    shortBreak: shortBreakTime,
    longBreakInterval: longBreakInterval,
    pomodoro: pomodoroTime,
  };

  return (
    <Formik
      initialValues={initial}
      validationSchema={settingSchema}
      onSubmit={(values) => {
        updateSettings(values);
        setIsOpen(false);
      }}
    >
      {({ handleBlur, values, setFieldValue, submitForm }) => (
        <>
          <FormSection
            title="TIMER"
            icon={<AntDesign name="clockcircleo" size={19} color="#E3B6B6" />}
          >
            <HStack flex="1" justifyContent="space-between">
              <CustomInput
                label="Pomodoro"
                labelPlacement="top"
                renderInput={() => (
                  <Input
                    value={values.pomodoro.toString()}
                    onChangeText={(value) => {
                      setFieldValue("pomodoro", handleNumberInput(value));
                    }}
                    onBlur={handleBlur("pomodoro")}
                    keyboardType="numeric"
                    style={{ backgroundColor: "#EFEFEF" }}
                  />
                )}
              />
              <CustomInput
                label="Short break"
                labelPlacement="top"
                renderInput={() => (
                  <Input
                    value={values.shortBreak.toString()}
                    onChangeText={(value) => {
                      setFieldValue("shortBreak", handleNumberInput(value));
                    }}
                    onBlur={handleBlur("shortBreak")}
                    keyboardType="numeric"
                    style={{ backgroundColor: "#EFEFEF" }}
                  />
                )}
              />
              <CustomInput
                label="Long break"
                labelPlacement="top"
                renderInput={() => (
                  <Input
                    value={values.longBreak.toString()}
                    onChangeText={(value) => {
                      setFieldValue("longBreak", handleNumberInput(value));
                    }}
                    onBlur={handleBlur("longBreak")}
                    keyboardType="numeric"
                    style={{ backgroundColor: "#EFEFEF" }}
                  />
                )}
              />
            </HStack>
            <CustomInput
              label="Auto Start Breaks"
              labelPlacement="left"
              renderInput={() => (
                <Switch
                  onTrackColor="additional.light"
                  onToggle={(value) => {
                    setFieldValue("autoStartBreaks", value);
                  }}
                  size="md"
                  value={values.autoStartBreaks}
                />
              )}
            />
            <CustomInput
              label="Auto Start Pomodoros"
              labelPlacement="left"
              renderInput={() => (
                <Switch
                  onTrackColor="additional.light"
                  onToggle={(value) => {
                    setFieldValue("autoStartPomodoros", value);
                  }}
                  size="md"
                  value={values.autoStartPomodoros}
                />
              )}
            />
            <CustomInput
              label="Long Break Interval"
              labelPlacement="left"
              renderInput={() => (
                <Input
                  value={values.longBreakInterval.toString()}
                  onChangeText={(value) => {
                    setFieldValue(
                      "longBreakInterval",
                      handleNumberInput(value)
                    );
                  }}
                  onBlur={handleBlur("longBreakInterval")}
                  keyboardType="numeric"
                  style={{ backgroundColor: "#EFEFEF" }}
                />
              )}
            />
          </FormSection>
          <Button onPress={submitForm}>Ok</Button>
        </>
      )}
    </Formik>
  );
};

interface CustomInputProps {
  labelPlacement: "top" | "left";
  label: string;
  renderInput: () => ReactNode;
}

const CustomInput = ({
  labelPlacement,
  label,
  renderInput,
}: CustomInputProps) => {
  if (labelPlacement === "left")
    return (
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box marginRight="24">
          <Text color="additional.dark" fontWeight="bold">
            {label}
          </Text>
        </Box>
        <Box flex="1">{renderInput()}</Box>
      </Box>
    );

  return (
    <VStack space="1" flex="0.30" justifyContent="space-between">
      <Text color="additional.dark" fontWeight="bold">
        {label}
      </Text>
      {renderInput()}
    </VStack>
  );
};

export default SettingForm;
