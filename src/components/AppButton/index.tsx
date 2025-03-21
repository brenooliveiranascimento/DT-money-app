import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FC, PropsWithChildren } from "react";
import { colors } from "@/styles/colors";

type AppButtonMode = "fill" | "outline";

interface AppButtonParams extends TouchableOpacityProps {
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
    mode === "fill" ? "text-white" : "text-green"
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
    buttonClassNames.push("bg-green");
  } else {
    buttonClassNames.push("bg-none border-2");
    buttonClassNames.push("border-green");
  }

  return (
    <TouchableOpacity {...rest} className={buttonClassNames.join(" ")}>
      <Text className={`${baseColor} text-lg`}>{children}</Text>
      {iconName && (
        <MaterialIcons
          color={mode === "fill" ? colors.white : colors.green}
          className="mr-3"
          name={iconName}
          size={24}
        />
      )}
    </TouchableOpacity>
  );
};
