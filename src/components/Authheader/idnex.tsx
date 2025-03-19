import { useKeyboardVisible } from "@/hooks/useKeyboardVisible";
import { Image, View } from "react-native";

export const AuthHeader = () => {
  const keyboardIsVisible = useKeyboardVisible();

  return (
    <View className="items-center justify-center w-full min-h-40">
      {!keyboardIsVisible && (
        <Image
          source={require("@/assets/images/Logo.png")}
          className="h-[48px] w-[255]"
        />
      )}
    </View>
  );
};

export default AuthHeader;
