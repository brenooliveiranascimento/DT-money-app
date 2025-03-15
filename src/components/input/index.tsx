import { FC, ReactNode } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface AppInputParams extends TextInputProps {
  onChangeText: (text: string) => void;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  renderRight?: () => ReactNode;
  label?: string;
}

export const AppInput: FC<AppInputParams> = ({
  iconName,
  label,
  secureTextEntry = false,
  ...rest
}) => {
  return (
    <View className="mb-7 w-full">
      {label && <Text className="text-gray-600 mb-2">{label}</Text>}
      <View className="flex-row items-center border-b-2 border-gray-600 px-1 py-2 h-16">
        {iconName && (
          <MaterialIcons
            color={"#949494"}
            className="mr-3"
            name={iconName}
            size={32}
          />
        )}
        <TextInput
          placeholderTextColor={"#949494"}
          className="flex-1 text-white text-xl"
          {...rest}
        />
      </View>
    </View>
  );
};
