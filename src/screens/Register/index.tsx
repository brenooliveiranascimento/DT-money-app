import { View } from "react-native";
import DismissKeyboardView from "@/components/DismissKeyboardView";
import { RegisterForm } from "./Form";
import { AuthHeader } from "@/components/Authheader";

const Register = () => {
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <RegisterForm />
      </View>
    </DismissKeyboardView>
  );
};

export default Register;
