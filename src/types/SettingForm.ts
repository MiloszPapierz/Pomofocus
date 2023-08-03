import * as Yup from "yup";
import { InferType } from "./Global";

const settingSchema = Yup.object().shape({
  pomodoro: Yup.number().min(0).required().positive(),
  shortBreak: Yup.number().min(0).required().positive(),
  longBreak: Yup.number().min(0).required().positive(),
  autoStartBreaks: Yup.boolean().required().default(false),
  autoStartPomodoros: Yup.boolean().required().default(false),
  longBreakInterval: Yup.number().min(0).default(4),
});

const settingInitialSchema: testType = {
  pomodoro: 0,
  shortBreak: 0,
  longBreak: 0,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  longBreakInterval: 4,
};

type testType = InferType<typeof settingSchema>;

export { settingSchema, testType, settingInitialSchema };
