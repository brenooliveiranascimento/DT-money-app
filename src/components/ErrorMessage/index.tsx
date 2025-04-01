import { FC, PropsWithChildren } from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

export const ErrorMessage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View className="flex-row items-center mt-1">
      <MaterialIcons
        name="error-outline"
        size={16}
        color={colors["accent-red-dark"]}
        className="mr-1"
      />
      <Text className="text-accent-red-dark">{children}</Text>
    </View>
  );
};
