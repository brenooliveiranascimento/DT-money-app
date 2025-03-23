import { FC, ReactNode, useRef, useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

interface AppInputParams extends TextInputProps {
  onChangeText: (text: string) => void;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  rightIconName?: keyof typeof MaterialIcons.glyphMap;
  renderRight?: () => ReactNode;
  label?: string;
  error?: boolean;
  bg?: string;
}

export const AppInput: FC<AppInputParams> = ({
  leftIconName,
  rightIconName,
  label,
  secureTextEntry,
  error,
  bg,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showText, setShowText] = useState(secureTextEntry);

  const inputRef = useRef<TextInput>(null);

  const checkFocus = () => {
    if (inputRef.current) {
      setIsFocused(inputRef.current.isFocused());
    }
  };

  const defaultColor = error
    ? "text-red"
    : isFocused
    ? "text-green"
    : "text-gray-600";

  const iconColor = error
    ? colors["accent-red"]
    : isFocused
    ? colors.green
    : colors.gray["600"];

  const handleSecurityEntry = () => setShowText((prev) => !prev);

  return (
    <View className="mb-2 w-full">
      {label && <Text className={`${defaultColor} mb-2 mt-3`}>{label}</Text>}
      <TouchableOpacity
        onPress={() => inputRef.current?.focus()}
        activeOpacity={1}
        className={`flex-row items-center border-b border-gray-600 px-3 py-2 h-16 ${
          bg ?? ""
        }`}
      >
        {leftIconName && (
          <MaterialIcons
            color={iconColor}
            className="mr-3"
            name={leftIconName}
            size={26}
          />
        )}
        <TextInput
          ref={inputRef}
          placeholderTextColor={colors.gray["600"]}
          onFocus={checkFocus}
          onEndEditing={checkFocus}
          className="flex-1 text-white text-lg"
          secureTextEntry={showText}
          {...rest}
        />

        {rightIconName && (
          <MaterialIcons
            color={colors.gray["600"]}
            className="mr-3"
            name={rightIconName}
            size={26}
          />
        )}

        {secureTextEntry && (
          <TouchableOpacity onPress={handleSecurityEntry}>
            <MaterialIcons
              color={colors.gray["600"]}
              className="mr-3"
              name={showText ? "visibility" : "visibility-off"}
              size={26}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};
