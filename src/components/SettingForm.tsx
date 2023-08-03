import { Formik } from "formik";
import { settingInitialSchema, settingSchema } from "../types/SettingForm";
import { Box, Button, HStack, Input, Switch, Text, VStack } from "native-base";
import { ReactNode } from "react";

const SettingForm = () => {
  const handleNumberInput = (value: string) => {
    if (!value) return "";

    const numericValue = parseInt(value);
    return numericValue;
  };

  return (
    <Formik
      initialValues={settingInitialSchema}
      validationSchema={settingSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({
        handleChange,
        handleBlur,
        values,
        setFieldValue,
        submitForm,
        errors,
      }) => (
        <>
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
                />
              )}
            />
          </HStack>
          <CustomInput
            label="Auto Start Breaks"
            labelPlacement="left"
            renderInput={() => (
              <Switch
                defaultIsChecked={values.autoStartBreaks}
                onToggle={(value) => setFieldValue("autoStartBreaks", value)}
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
                defaultIsChecked={values.autoStartPomodoros}
                onToggle={(value) => setFieldValue("autoStartPomodoros", value)}
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
                  setFieldValue("longBreakInterval", handleNumberInput(value));
                }}
                onBlur={handleBlur("longBreakInterval")}
                keyboardType="numeric"
              />
            )}
          />
          <Button onPress={submitForm}>Submit</Button>
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
          <Text>{label}</Text>
        </Box>
        <Box flex="1">{renderInput()}</Box>
      </Box>
    );

  return (
    <VStack space="1" flex="0.30" justifyContent="space-between">
      <Text>{label}</Text>
      {renderInput()}
    </VStack>
  );
};

export default SettingForm;
