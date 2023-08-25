import { Schema } from "yup";

type InferType<T extends Schema<any>> = T extends Schema<infer U> ? U : never;

type StorageKeys = "SettingOptions";

export { InferType, StorageKeys };
