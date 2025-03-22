import { AppInput } from "@/components/input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AppButton } from "@/components/AppButton";
import { ActivityIndicator, Text, View } from "react-native";
import { ErrorMessage } from "@/components/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { colors } from "@/styles/colors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { useAuthContext } from "@/context/auth.context";

export interface FormLogin {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { handleAuthenticate } = useAuthContext();

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

  const onSubmit: SubmitHandler<FormLogin> = async (formData) => {
    await handleAuthenticate(formData);
  };

  const navigation =
    useNavigation<StackNavigationProp<PublicStackParamsList>>();

  return (
    <>
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
              placeholder="Mail@exemplo.br"
              label="EMAIL"
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

      <View className="flex-1 justify-between mt-10 mb-7 w-full min-h-[250]">
        <AppButton
          iconName={isSubmitting ? undefined : "arrow-forward"}
          onPress={handleSubmit(onSubmit)}
        >
          {isSubmitting ? <ActivityIndicator color={colors.white} /> : "Login"}
        </AppButton>
        <View>
          <Text className="mb-3 text-gray-500 text-xl">
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
