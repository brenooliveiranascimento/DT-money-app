import { AppInput } from "@/components/AppInput";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AppButton } from "@/components/AppButton";
import { ActivityIndicator, Text, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { colors } from "@/styles/colors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { useAuthContext } from "@/context/auth.context";
import { useErrorHandler } from "@/shared/hooks/errorHandler";

export interface FormLogin {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { handleAuthenticate } = useAuthContext();
  const { handleError } = useErrorHandler();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLogin>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigation =
    useNavigation<StackNavigationProp<PublicStackParamsList>>();

  const onSubmit: SubmitHandler<FormLogin> = async (formData) => {
    try {
      await handleAuthenticate(formData);
    } catch (error) {
      handleError(error, "Falha ao realizar o login");
    }
  };

  return (
    <>
      <AppInput<FormLogin>
        control={control}
        name="email"
        leftIconName="mail-outline"
        placeholder="mail@exemplo.br"
        label="EMAIL"
        autoComplete="email"
        autoCapitalize="none"
      />

      <AppInput<FormLogin>
        control={control}
        name="password"
        leftIconName="lock-outline"
        placeholder="Sua senha"
        label="SENHA"
        secureTextEntry
        autoComplete="password"
      />

      <View className="flex-1 justify-between mt-8 mb-6 w-full min-h-[250]">
        <AppButton
          iconName={isSubmitting ? undefined : "arrow-forward"}
          onPress={handleSubmit(onSubmit)}
        >
          {isSubmitting ? <ActivityIndicator color={colors.white} /> : "Login"}
        </AppButton>
        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Ainda não possui uma conta?
          </Text>
          <AppButton
            mode="outline"
            iconName="arrow-forward"
            onPress={() => navigation.navigate("Register")}
          >
            Cadastrar
          </AppButton>
        </View>
      </View>
    </>
  );
};
