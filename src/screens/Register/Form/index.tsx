import { AppInput } from "@/components/input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AppButton } from "@/components/AppButton";
import { ActivityIndicator, Text, View } from "react-native";
import { ErrorMessage } from "@/components/ErrorMessage";
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
      <Controller
        control={control}
        name="name"
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <AppInput
            leftIconName="person"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Seu nome"
            label="Seu nome completo"
            error={error?.message}
            autoComplete="name"
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <AppInput
            leftIconName="mail-outline"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="main@exemplo.br"
            label="E-Mail"
            error={error?.message}
            autoComplete="email"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <AppInput
            leftIconName="lock-outline"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Sua senha"
            label="SENHA"
            secureTextEntry
            error={error?.message}
            autoComplete="password"
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <AppInput
            leftIconName="lock-outline"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Confirmar sua senha"
            label="Confirmar senha"
            secureTextEntry
            error={error?.message}
          />
        )}
      />

      <View className="justify-between mt-10 mb-7 w-full h-[200]">
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
          <Text className="mb-3 text-gray-500 text-xl">Já tem uma conta?</Text>
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
