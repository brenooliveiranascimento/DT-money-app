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

export interface FormRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { handleRegister } = useAuthContext();

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
    await handleRegister(formData);
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
          <>
            <AppInput
              iconName="person"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Seu nome"
              label="Seu nome completo"
              error={Boolean(error)}
              autoComplete="name"
            />
            <ErrorMessage>{error?.message}</ErrorMessage>
          </>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <>
            <AppInput
              iconName="mail-outline"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="main@exemplo.br"
              label="E-Mail"
              error={Boolean(error)}
              autoComplete="email"
            />
            <ErrorMessage>{error?.message}</ErrorMessage>
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <>
            <AppInput
              iconName="lock-outline"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Sua senha"
              label="SENHA"
              secureTextEntry
              error={Boolean(error)}
              autoComplete="password"
            />
            <ErrorMessage>{error?.message}</ErrorMessage>
          </>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <>
            <AppInput
              iconName="lock-outline"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Confirmar sua senha"
              label="Confirmar senha"
              secureTextEntry
              error={Boolean(error)}
            />
            <ErrorMessage>{error?.message}</ErrorMessage>
          </>
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
