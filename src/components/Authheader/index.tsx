import { useKeyboardVisible } from "@/hooks/useKeyboardVisible";
import { Image, View } from "react-native";

export const AuthHeader = () => {
  const keyboardIsVisible = useKeyboardVisible();

  if (keyboardIsVisible) {
    return <></>;
  }

  return (
    <View className="items-center justify-center w-full min-h-40">
      <Image
        source={require("@/assets/images/Logo.png")}
        className="h-[48px] w-[255]"
      />
    </View>
  );
};
