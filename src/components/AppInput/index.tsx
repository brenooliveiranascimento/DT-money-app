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
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface AppInputParams<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  renderRight?: () => ReactNode;
  label?: string;
}

export const AppInput = <T extends FieldValues>({
  control,
  name,
  leftIconName,
  label,
  secureTextEntry,
  ...rest
}: AppInputParams<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showText, setShowText] = useState(secureTextEntry);
  const inputRef = useRef<TextInput>(null);

  const checkFocus = () => {
    if (inputRef.current) {
      setIsFocused(inputRef.current.isFocused());
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const isFilled = Boolean(value);

        return (
          <View className="mb-4 w-full">
            {label && (
              <Text
                className={clsx(
                  "mb-2 mt-3 text-base",
                  error && "text-red-dark",
                  isFocused || isFilled ? "text-green" : "text-gray-600"
                )}
              >
                {label}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => inputRef.current?.focus()}
              activeOpacity={1}
              className={clsx(
                "flex-row items-center justify-between border-b-[1px] px-3 py-2 h-16 border-gray-600"
              )}
            >
              {leftIconName && (
                <MaterialIcons
                  color={clsx(
                    error
                      ? colors["accent-red-dark"]
                      : isFocused || isFilled
                      ? colors.green
                      : colors.gray["600"]
                  )}
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
                onChangeText={onChange}
                value={value}
                {...rest}
              />

              {secureTextEntry && (
                <TouchableOpacity onPress={() => setShowText((prev) => !prev)}>
                  <MaterialIcons
                    color={colors.gray["600"]}
                    className="mr-2"
                    name={showText ? "visibility" : "visibility-off"}
                    size={24}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </View>
        );
      }}
    />
  );
};
