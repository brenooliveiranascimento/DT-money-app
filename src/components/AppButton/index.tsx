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
    mode === "fill" ? "text-white" : "text-accent-brand"
  } font-normal`;

  const buttonClassNames: string[] = [
    "w-full",
    "rounded-xl",
    "px-5",
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
    buttonClassNames.push("bg-accent-brand");
  } else {
    buttonClassNames.push("bg-none border-[1px]");
    buttonClassNames.push("border-accent-brand");
  }

  return (
    <TouchableOpacity {...rest} className={buttonClassNames.join(" ")}>
      <Text className={`${baseColor} text-base`}>{children}</Text>
      {iconName && (
        <MaterialIcons
          color={mode === "fill" ? colors.white : colors["accent-brand"]}
          name={iconName}
          size={24}
        />
      )}
    </TouchableOpacity>
  );
};
