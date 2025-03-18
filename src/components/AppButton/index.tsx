import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FC, PropsWithChildren } from "react";
import { colors } from "@/styles/colors";

type AppButtonMode = "fill" | "outline";

interface AppButtonParams extends TouchableOpacityProps {
  icon?: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  mode?: AppButtonMode;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

export const AppButton: FC<PropsWithChildren<AppButtonParams>> = ({
  children,
  mode = "fill",
  iconName,
  ...rest
}) => {
  const baseColor = `${
    mode === "fill" ? "text-white" : "text-secondary"
  } font-bold text-xl`;

  const buttonClassNames: string[] = [
    "w-full",
    "rounded-xl",
    "px-6",
    "flex-row",
    "items-center",
    "h-button",
  ];

  if (iconName) {
    buttonClassNames.push("justify-between");
  } else {
    buttonClassNames.push("justify-center");
  }

  if (mode === "fill") {
    buttonClassNames.push("bg-secondary");
  } else {
    buttonClassNames.push("bg-none border-2");
    buttonClassNames.push("border-secondary");
  }

  return (
    <TouchableOpacity {...rest} className={buttonClassNames.join(" ")}>
      <Text className={`${baseColor} text-lg`}>{children}</Text>
      {iconName && (
        <MaterialIcons
          color={mode === "fill" ? colors.white : colors.secondary}
          className="mr-3"
          name={iconName}
          size={24}
        />
      )}
    </TouchableOpacity>
  );
};
