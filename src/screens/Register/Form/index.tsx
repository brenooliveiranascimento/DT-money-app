import { AppInput } from "@/components/AppInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppButton } from "@/components/AppButton";
import { ActivityIndicator, Text, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { colors } from "@/styles/colors";
import { schema } from "./schema";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { useAuthContext } from "@/context/auth.context";
import { useErrorHandler } from "@/shared/hooks/errorHandler";

export interface FormRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { handleRegister } = useAuthContext();
  const { handleError } = useErrorHandler();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormRegister>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigation =
    useNavigation<StackNavigationProp<PublicStackParamsList>>();

  const onSubmit: SubmitHandler<FormRegister> = async (formData) => {
    try {
      await handleRegister(formData);
    } catch (error) {
      handleError(error, "Falha ao realizar o registro");
    }
  };

  return (
    <>
      <AppInput
        leftIconName="person"
        placeholder="Seu nome"
        label="Seu nome completo"
        autoComplete="name"
        control={control}
        name="name"
      />

      <AppInput<FormRegister>
        control={control}
        name="email"
        leftIconName="mail-outline"
        placeholder="mail@exemplo.br"
        label="EMAIL"
        autoComplete="email"
      />

      <AppInput<FormRegister>
        control={control}
        name="password"
        leftIconName="lock-outline"
        placeholder="Sua senha"
        label="SENHA"
        secureTextEntry
        autoComplete="password"
      />

      <AppInput<FormRegister>
        control={control}
        name="password"
        leftIconName="lock-outline"
        placeholder="Confirme sua senha"
        label="SENHA"
        secureTextEntry
        autoComplete="password"
      />

      <View className="justify-between mt-8 mb-6 w-full h-[200]">
        <AppButton
          iconName={isSubmitting ? undefined : "arrow-forward"}
          onPress={handleSubmit(onSubmit)}
        >
          {isSubmitting ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            "Cadastrar"
          )}
        </AppButton>
        <View>
          <Text className="text-gray-300 text-base mb-6">
            Já tem uma conta?
          </Text>
          <AppButton
            mode="outline"
            iconName="arrow-forward"
            onPress={() => navigation.navigate("Login")}
          >
            Acessar
          </AppButton>
        </View>
      </View>
    </>
  );
};
