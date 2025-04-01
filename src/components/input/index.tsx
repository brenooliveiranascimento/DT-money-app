import { FC, ReactNode, useRef, useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ErrorMessage } from "../ErrorMessage";
import clsx from "clsx";
import { colors } from "@/styles/colors";

interface AppInputParams extends TextInputProps {
  onChangeText: (text: string) => void;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  renderRight?: () => ReactNode;
  label?: string;
  error?: string;
}

export const AppInput: FC<AppInputParams> = ({
  leftIconName,
  label,
  secureTextEntry,
  error,
  value,
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

  const isFilled = Boolean(value);

  const labelColor = error
    ? colors["accent-red-dark"]
    : isFocused || isFilled
    ? colors.green
    : colors.gray["600"];

  const iconColor = error
    ? colors["accent-red-dark"]
    : isFocused || isFilled
    ? colors.green
    : colors.gray["600"];

  const handleSecurityEntry = () => setShowText((prev) => !prev);

  return (
    <View className="mb-4 w-full">
      {label && (
        <Text style={{ color: labelColor }} className="mb-2 mt-3 text-base">
          {label}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => inputRef.current?.focus()}
        activeOpacity={1}
        className="flex-row items-center justify-between border-b border-gray-600 px-3 py-2 h-16"
      >
        {leftIconName && (
          <MaterialIcons
            color={iconColor}
            className="mr-2"
            name={leftIconName}
            size={24}
          />
        )}

        <TextInput
          ref={inputRef}
          placeholderTextColor={colors.gray["700"]}
          onFocus={checkFocus}
          onEndEditing={checkFocus}
          className="flex-1 text-gray-500 text-base"
          secureTextEntry={showText}
          cursorColor={colors.green}
          {...rest}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={handleSecurityEntry}>
            <MaterialIcons
              color={colors.gray["600"]}
              className="mr-2"
              name={showText ? "visibility" : "visibility-off"}
              size={24}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </View>
  );
};
