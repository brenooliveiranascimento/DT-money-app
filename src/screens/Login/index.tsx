import { useKeyboardVisible } from "@/hooks/useKeyboardVisible";
import { Image, View } from "react-native";
import DismissKeyboardView from "@/components/DismissKeyboardView";
import { LoginForm } from "./Form";

const Login = () => {
  const keyboardIsVisible = useKeyboardVisible();

  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[90%] self-center">
        <View className="items-center justify-center w-full p-10">
          {!keyboardIsVisible && (
            <Image
              source={require("@/assets/images/Logo.png")}
              className="h-[48px] w-[255]"
            />
          )}
        </View>
        <LoginForm />
      </View>
    </DismissKeyboardView>
  );
};

export default Login;
