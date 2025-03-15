import { AppInput } from "@/components/input";
import { Controller } from "react-hook-form";
import { AppButton } from "@/components/AppButton";

export const LoginForm = ({ control, handleSubmit, onSubmit }: any) => {
  return (
    <>
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
        render={({ field: { onBlur, onChange, value } }) => (
          <AppInput
            iconName="lock-outline"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Senha"
            label="Senha"
            secureTextEntry
          />
        )}
      />

      <AppButton onPress={handleSubmit(onSubmit)}>Login</AppButton>
    </>
  );
};
