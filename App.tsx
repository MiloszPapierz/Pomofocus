import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import Main from "./src/screens/Main";
import { PomodoroProvider } from "./src/contexts/PomodoroProvider";

export default function App() {
  const theme = extendTheme({
    colors: {
      pomodorro: {
        medium: "#BA4949",
        light: "#C15C5C",
        dark: "#A44E4E",
      },
      shortBreak: {
        medium: "#38858a",
        light: "#4c9196",
        dark: "#417b80",
      },
      longBreak: {
        medium: "#397097",
        light: "#4d7fa2",
        dark: "#426c8a",
      },
      additional: {
        medium: "#E3B6B6",
      },
    },
  });

  return (
    <PomodoroProvider>
      <NativeBaseProvider theme={theme}>
        <Main />
      </NativeBaseProvider>
    </PomodoroProvider>
  );
}
