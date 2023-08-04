import * as Yup from "yup";
import { InferType } from "./global";

const settingSchema = Yup.object().shape({
  pomodoro: Yup.number().min(0).required().positive(),
  shortBreak: Yup.number().min(0).required().positive(),
  longBreak: Yup.number().min(0).required().positive(),
  autoStartBreaks: Yup.boolean().required().default(false),
  autoStartPomodoros: Yup.boolean().required().default(false),
  longBreakInterval: Yup.number().min(0).default(4),
});

type SettingType = InferType<typeof settingSchema>;

export { settingSchema, SettingType };
