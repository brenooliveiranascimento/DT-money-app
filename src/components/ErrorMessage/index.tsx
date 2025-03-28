import { FC, PropsWithChildren } from "react";
import { Text } from "react-native";

export const ErrorMessage: FC<PropsWithChildren> = ({ children }) => {
  return <Text className="text-accent-red">{children}</Text>;
};
