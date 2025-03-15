import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FC, PropsWithChildren } from "react";

type AppButtonMode = "fill" | "outline";

interface AppButtonParams extends TouchableOpacityProps {
  icon?: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  mode?: AppButtonMode;
}

export const AppButton: FC<PropsWithChildren<AppButtonParams>> = ({
  children,
  mode = "fill",
  ...rest
}) => {
  return (
    <TouchableOpacity {...rest} className="bg-secondary w-full rounded-sm">
      <Text className="text-white">{children}</Text>
    </TouchableOpacity>
  );
};
