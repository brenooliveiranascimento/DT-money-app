import { View } from "react-native";
import DismissKeyboardView from "@/components/DismissKeyboardView";
import { LoginForm } from "./Form";
import { AuthHeader } from "@/components/Authheader";

const Login = () => {
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <LoginForm />
      </View>
    </DismissKeyboardView>
  );
};

export default Login;
