import { AppInput } from "@/components/input";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useKeyboardVisible } from "@/hooks/useKeyboardVisible";
import { Image, View } from "react-native";
import DismissKeyboardView from "@/components/DismissKeyboardView";
import { AppButton } from "@/components/AppButton";

export interface FormLogin {
  email: string;
  password: string;
}

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormLogin> = (formData) => {};

  const keyboardIsVisible = useKeyboardVisible();

  return (
    <DismissKeyboardView>
      <View className="bg-dark flex-1 items-center justify-center">
        <View className="w-[90%]">
          {!keyboardIsVisible && (
            <Image
              source={require("@/assets/images/Logo.png")}
              className="mb-28"
            />
          )}

          <Controller
            control={control}
            name="email"
            render={({ field: { onBlur, onChange, value } }) => (
              <AppInput
                iconName="mail-outline"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Mail@exemplo.br"
                label="E-Mail"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <AppInput
                iconName="lock-outline"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Senha"
                label="Senha"
                secureTextEntry={true}
              />
            )}
          />

          <AppButton onPress={handleSubmit(onSubmit)}>a</AppButton>
        </View>
      </View>
    </DismissKeyboardView>
  );
};

export default Login;
